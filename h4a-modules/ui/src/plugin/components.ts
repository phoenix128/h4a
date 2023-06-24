import { IPluginComponentsCollection } from '@h4a/core/interface/plugin-interface';
import Card, { CardSchema } from '@h4a/ui/components/Card';
import Grid, { GridSchema } from '@h4a/ui/components/Grid';
import PageTitle, { PageTitleSchema } from '@h4a/ui/components/PageTitle';
import Section, { SectionSchema } from '@h4a/ui/components/Section';
import Html, { HtmlSchema } from '@h4a/ui/components/Html';
import SimpleImage, { BannerSchema } from '@h4a/ui/components/Banner';

const components: IPluginComponentsCollection = {
    Card: { component: Card, schema: CardSchema },
    Grid: { component: Grid, schema: GridSchema },
    PageTitle: { component: PageTitle, schema: PageTitleSchema },
    Section: { component: Section, schema: SectionSchema },
    Html: { component: Html, schema: HtmlSchema },
    Banner: { component: SimpleImage, schema: BannerSchema },
};

export default components;
