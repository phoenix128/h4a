import { ASTNode, GraphQLResolveInfo, Kind, print, visit } from 'graphql/index';

/**
 * Extracts ina string all the required fragments from a GraphQL request
 * that are required inside a query
 * @param documentNode
 * @param info
 */
const extractRequestFragments = (
    documentNode: ASTNode,
    info: GraphQLResolveInfo
) => {
    const fragments: any[] = [];

    visit(documentNode, {
        [Kind.FRAGMENT_SPREAD]: (node) => {
            fragments.push(node);
        },
    });

    return fragments
        .map((fragment) => print(info!.fragments[fragment.name.value]))
        .join('\n');
};

export default extractRequestFragments;
