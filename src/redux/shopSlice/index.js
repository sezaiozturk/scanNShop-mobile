import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

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
            axios.post(
                'http://localhost:3000/user/updateShoppingCart',
                {
                    _id: action.payload.userId,
                    shoppingCarts: state.shoppingCartList,
                },
                {
                    headers: {
                        'x-auth-token': action.payload.token,
                    },
                },
            );
        },
        update: (state, action) => {
            let x = state.shoppingCartList.find(
                item => item.companyId === action.payload.companyId,
            );
            let del = state.shoppingCartList.indexOf(x);
            let y = x.list.findIndex(item => item.id === action.payload.id);
            if (action.payload.operation === '+') {
                x.list[y].count += 1;
                state.basketTotal += action.payload.price;
            } else if (action.payload.operation === '-') {
                x.list[y].count -= 1;
                state.basketTotal -= action.payload.price;
            } else {
                x.list.splice(y, 1);
                state.basketTotal -=
                    action.payload.price * action.payload.count;
            }
            if (x.list.length === 0) {
                state.shoppingCartList.splice(del, 1);
            }
            axios.post(
                'http://localhost:3000/user/updateShoppingCart',
                {
                    _id: action.payload.userId,
                    shoppingCarts: state.shoppingCartList,
                },
                {
                    headers: {
                        'x-auth-token': action.payload.token,
                    },
                },
            );
        },
        total: state => {
            state.basketTotal = 0;
            state.shoppingCartList.map(company => {
                company.list.map(product => {
                    state.basketTotal += product.price * product.count;
                });
            });
        },
        updateShoppingCartList: (state, action) => {
            state.shoppingCartList = action.payload;
        },
    },
});
export const {addProduct, update, updateShoppingCartList, total} =
    shopSlice.actions;

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
