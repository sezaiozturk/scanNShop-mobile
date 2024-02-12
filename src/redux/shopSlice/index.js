import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    shoppingCartList: [],
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
            let x = state.shoppingCartList.findIndex(
                item => item.companyId == action.payload.companyId,
            );
            if (x == -1) {
                myObj = {
                    companyId: action.payload.companyId,
                    companyName: action.payload.companyName,
                    list: [product],
                };
                state.shoppingCartList.push(myObj);
            } else {
                let y = state.shoppingCartList[x].list.findIndex(
                    item => item.id == action.payload._id,
                );
                if (y == -1) {
                    state.shoppingCartList[x].list.push(product);
                } else {
                    state.shoppingCartList[x].list[y].count += 1;
                }
            }
        },
        total: state => {
            state.basketTotal = 0;
            state.shoppingCartList.map(company => {
                company.list.map(product => {
                    state.basketTotal += product.price * product.count;
                });
            });
        },
    },
});
export const {addProduct, total} = shopSlice.actions;

export default shopSlice.reducer;

/*companyId: action.payload.companyId,
companyName: action.payload.companyName,
list: [product],*/

/**
 * let product = {
                id: action.payload._id,
                category: action.payload.category,
                image: action.payload.image,
                barcod: action.payload.barkod,
                name: action.payload.name,
                price: action.payload.price,
                count: 1,
            };
 */

/**
 * let control = 0;
            if (state.shoppingCartList.length === 0) {
                myObj = {
                    companyId: action.payload.companyId,
                    companyName: action.payload.companyName,
                    list: [product],
                };
                state.shoppingCartList.push(myObj);
            } else {
                state.shoppingCartList.map(item => {
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
                    state.shoppingCartList.push(myObj);
                }
            }
            control = 0;
 */
