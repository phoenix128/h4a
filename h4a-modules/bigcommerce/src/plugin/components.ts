import { IPluginComponentsCollection } from '@h4a/core/interface/plugin-interface';
import CategoryNav, {
    CategoryNavSchema,
} from '@h4a/bigcommerce/components/CategoryNav';
import Pagination, {
    PaginationSchema,
} from '@h4a/bigcommerce/components/Pagination';
import ProductsList, {
    ProductsListSchema,
} from '@h4a/bigcommerce/components/ProductsList';
import ProductImage, {
    ProductImageSchema,
} from '@h4a/bigcommerce/components/ProductImage';
import ProductDetails, {
    ProductDetailsSchema,
} from '@h4a/bigcommerce/components/ProductDetails';
import AddToCart, {
    AddToCartSchema,
} from '@h4a/bigcommerce/components/AddToCart';
import ProductOptions, {
    ProductOptionsSchema,
} from '@h4a/bigcommerce/components/ProductOptions';
import LoginForm, {
    LoginFormSchema,
} from '@h4a/bigcommerce/components/LoginForm';

const components: IPluginComponentsCollection = {
    CategoryNav: { component: CategoryNav, schema: CategoryNavSchema },
    ProductImage: { component: ProductImage, schema: ProductImageSchema },
    ProductDetails: { component: ProductDetails, schema: ProductDetailsSchema },
    AddToCart: { component: AddToCart, schema: AddToCartSchema },
    Pagination: { component: Pagination, schema: PaginationSchema },
    ProductsList: { component: ProductsList, schema: ProductsListSchema },
    ProductOptions: { component: ProductOptions, schema: ProductOptionsSchema },
    LoginForm: { component: LoginForm, schema: LoginFormSchema },
};

export default components;
