import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    shoppingCart: [],
    basketTotal: 0,
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            let myObj = {};
            let product = {
                id: action.payload._id,
                category: action.payload.category,
                image: action.payload.image,
                barcod: action.payload.barkod,
                name: action.payload.name,
                price: action.payload.price,
                count: 1,
            };
            let control = 0;
            if (state.shoppingCart.length === 0) {
                myObj = {
                    companyId: action.payload.companyId,
                    companyName: action.payload.companyName,
                    list: [product],
                };
                state.shoppingCart.push(myObj);
            } else {
                state.shoppingCart.map(item => {
                    if (item.companyId == action.payload.companyId) {
                        control = 1;
                        item.list.push(product);
                    }
                });
                if (control === 0) {
                    myObj = {
                        companyId: action.payload.companyId,
                        companyName: action.payload.companyName,
                        list: [product],
                    };
                    state.shoppingCart.push(myObj);
                }
            }
            control = 0;
        },
        total: state => {
            state.basketTotal = 0;
            state.shoppingCart.map(company => {
                company.list.map(product => {
                    state.basketTotal += product.price;
                });
            });
        },
    },
});
export const {addProduct, total} = shopSlice.actions;

export default shopSlice.reducer;
