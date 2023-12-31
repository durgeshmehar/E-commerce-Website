export const ITEMS_PER_PAGE = 10;
export const discountedPrice = (product)=>{
    return Math.round( product.price - (product.price * product.discountPercentage / 100))
}