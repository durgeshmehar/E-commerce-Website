import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts , fetchProductsByFilter ,fetchCategories, fetchBrands,fetchProductById ,addProduct ,updateProduct} from './productAPI';

const initialState = {
    products:[],
    categories:[],
    brands:[],
    status: 'idle',
    totalItems:0,
    selectedProduct:null,
    };

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async() => {
        const response = await fetchAllProducts();
        return response.data;
    }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
    'product/fetchProductsByFilter',
    async({filter,sort,pagination}) => {
        const response = await fetchProductsByFilter({filter,sort,pagination});
        return response.data;
    }
);

export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async() => {
        const response = await fetchCategories();
        return response.data;
    }
);
export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands',
    async() => {
        const response = await fetchBrands();
        return response.data;
    }
);
export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async(id) => {
        const response = await fetchProductById(id);
        return response.data;
    }
);
export const addProductAsync = createAsyncThunk(
    'product/addProduct',
    async(data) => {
        const response = await addProduct(data);
        return response.data;
    }
);
export const updateProductAsync = createAsyncThunk(
    'product/updateProduct',
    async(data) => {
        const response = await updateProduct(data);
        return response.data;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.products = action.payload.products;
        })
        .addCase(fetchProductsByFilterAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.products = action.payload.products;
            state.totalItems = action.payload.totalItems
        })
        .addCase(fetchCategoriesAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.categories = action.payload;
        })
        .addCase(fetchBrandsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.brands = action.payload;
        })
        .addCase(fetchProductByIdAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.selectedProduct = action.payload;
        })
        .addCase(addProductAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addProductAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.products.push(action.payload);
        })
        .addCase(updateProductAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateProductAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.products.findIndex(product=>product.id===action.payload.id)
            state.products[index] = action.payload;
            state.selectedProduct = action.payload;
        })
    }
});

export const { increment ,clearSelectedProduct} = productSlice.actions;
export const selectProductsArray = state=>state.product.products;
export const selectCategoriesArray = state=>state.product.categories;
export const selectBrandsArray = state=>state.product.brands;
export const selectProduct = state=>state.product.selectedProduct;
export const selectTotalItems = state=>state.product.totalItems;
export const selectProductListStatus = state=>state.product.status;


export default productSlice.reducer;
