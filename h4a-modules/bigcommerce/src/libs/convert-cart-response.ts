const convertCouponType = (couponType: number) => {
    switch (couponType) {
        case 0:
            return 'PER_ITEM_DISCOUNT';
        case 1:
            return 'PERCENTAGE_DISCOUNT';
        case 2:
            return 'PER_TOTAL_DISCOUNT';
        case 3:
            return 'SHIPPING_DISCOUNT';
        case 4:
            return 'FREE_SHIPPING';
        case 5:
            return 'PROMOTION';
    }

    throw new Error(`Unknown coupon type: ${couponType}`);
};

const mapCoupon = (c: any) => {
    const couponType = convertCouponType(c.coupon_type);

    return {
        id: c.id,
        code: c.code,
        couponType,
        discountedAmount: c.discounted_amount,
    };
};

const mapDiscount = (d: any) => ({
    id: d.id,
    discountedAmount: d.discounted_amount,
});

const mapPhysicalItem = (li: any) => ({
    id: li.id,
    variantId: li.variant_id,
    productId: li.product_id,
    sku: li.sku,
    name: li.name,
    weight: li.weight,
    dimensions: li.dimensions,
    url: li.url,
    quantity: li.quantity,
    isTaxable: li.is_taxable,
    imageUrl: li.image_url,
    discounts: li.discounts.map(mapDiscount),
    coupons: li.coupons.map(mapCoupon),
    discountedAmount: li.discounted_amount,
    couponAmount: li.coupon_amount,
    originalPrice: li.original_price,
    listPrice: li.list_price,
    salePrice: li.sale_price,
    extendedListPrice: li.extended_list_price,
    extendedSalePrice: li.extended_sale_price,
    options: li.options,
});

const mapDigitalItem = (li: any) => ({
    id: li.id,
    variantId: li.variant_id,
    productId: li.product_id,
    sku: li.sku,
    name: li.name,
    url: li.url,
    quantity: li.quantity,
    isTaxable: li.is_taxable,
    imageUrl: li.image_url,
    discounts: li.discounts.map(mapDiscount),
    coupons: li.coupons.map(mapCoupon),
    discountedAmount: li.discounted_amount,
    couponAmount: li.coupon_amount,
    originalPrice: li.original_price,
    listPrice: li.list_price,
    salePrice: li.sale_price,
    extendedListPrice: li.extended_list_price,
    extendedSalePrice: li.extended_sale_price,
    options: li.options,
    downloadFileUrls: li.download_file_urls,
    downloadPageUrl: li.download_page_url,
    downloadSize: li.download_size,
});

const mapGiftCertificateItem = (li: any) => ({
    id: li.id,
    name: li.name,
    theme: li.theme,
    amount: li.amount,
    sender: li.sender,
    recipient: li.recipient,
    message: li.message,
});

const mapCustomItem = (li: any) => ({
    id: li.id,
    name: li.name,
    quantity: li.quantity,
    sku: li.sku,
    listPrice: li.list_price,
});

const manPromotion = (p: any) => ({
    banners: p.banners,
});

const convertCartResponse = (data: any): any => ({
    id: data.id,
    customerId: data.customer_id,
    email: data.email,
    currency: data.currency,
    taxIncluded: data.tax_included,
    baseAmount: data.base_amount,
    discountAmount: data.discount_amount,
    cartAmount: data.cart_amount,
    coupons: data.coupons.map(mapCoupon),
    discounts: data.discounts.map(mapDiscount),
    lineItems: {
        physicalItems: data.line_items.physical_items.map(mapPhysicalItem),
        digitalItems: data.line_items.digital_items.map(mapDigitalItem),
        giftCertificates: data.line_items.gift_certificates.map(
            mapGiftCertificateItem
        ),
        customItems: data.line_items.custom_items.map(mapCustomItem),
    },
    createdTime: data.created_time,
    updatedTime: data.updated_time,
    channelId: data.channel_id,
    locale: data.locale,
    promotions: data.promotions?.map(manPromotion),
});

export default convertCartResponse;
