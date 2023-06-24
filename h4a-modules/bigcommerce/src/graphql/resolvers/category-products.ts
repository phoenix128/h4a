import { IPluginContext } from '@h4a/core/interface/plugin-interface';
import { gql } from 'graphql-tag';
import managementApi from '@h4a/bigcommerce/libs/management-api';
import { GraphQLSchema } from 'graphql/type';
import { delegateToSchema, Transform } from '@graphql-tools/delegate';
import { OperationTypeNode } from 'graphql/language/ast';
import { ProductsListTransformer } from '@h4a/bigcommerce/libs/products-list-transformer';

interface IArgs {
    page: number;
    limit: number;
}

const typeDefs = gql`
    type PaginatedProducts {
        items: [Product]
        totalItems: Int
        totalPages: Int
        perPage: Int
        currentPage: Int
    }

    extend type Category {
        paginatedProducts(page: Int, limit: Int): PaginatedProducts
    }
`;

const categoryPaginatedProducts = (bigCommerceSchema: GraphQLSchema) => ({
    selectionSet: `{ entityId }`, // Required from parent
    resolve: async (
        parent: any,
        { page, limit }: IArgs,
        context: IPluginContext,
        info: any
    ) => {
        const searchParams: Record<string, string> = {
            'categories:in': parent.entityId,
            page: '' + page,
            limit: '' + limit,
            is_visible: 'true',
            include_fields: 'id',
        };
        const productIdsList = await managementApi(
            'GET',
            `/catalog/products`,
            searchParams,
            null,
            context
        );

        const entityIds = productIdsList.data.map((p: any) => p.id);

        const { pagination } = productIdsList.meta;

        return {
            entityIds,
            totalItems: pagination.total,
            totalPages: pagination.total_pages,
            perPage: pagination.per_page,
            currentPage: pagination.current_page,
        };
    },
});

const paginatedItems = (bigCommerceSchema: GraphQLSchema) => ({
    selectionSet: `{ entityIds }`, // Required from parent
    resolve: async (
        parent: any,
        args: any,
        context: IPluginContext,
        info: any
    ) =>
        delegateToSchema({
            schema: bigCommerceSchema,
            operation: OperationTypeNode.QUERY,
            fieldName: 'site',
            context,
            info,
            operationName: 'ProductsByIds',
            transforms: [
                new ProductsListTransformer(parent.entityIds) as Transform,
            ],
        }),
});

const resolvers = (bigCommerceSchema: GraphQLSchema) => ({
    Category: {
        paginatedProducts: categoryPaginatedProducts(bigCommerceSchema),
    },
    PaginatedProducts: {
        items: paginatedItems(bigCommerceSchema),
    },
});

const resolverCategoryProductsSchema = {
    typeDefs,
    resolvers,
};

export default resolverCategoryProductsSchema;
