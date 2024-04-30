import {
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
    HOST
} from '../../constants';

const initialState = {
    shoppingCartList: [],
    basketTotal: 0,
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            let NewRecord = {};
            let product = {
                id: action.payload._id,
                category: action.payload.category,
                image: action.payload.image,
                barcod: action.payload.barkod,
                name: action.payload.name,
                price: action.payload.price,
                count: 1,
            };

            let companyIndex = state.shoppingCartList.findIndex(
                item => item.companyId == action.payload.companyId,
            );
            if (companyIndex == -1) {
                NewRecord = {
                    companyId: action.payload.companyId,
                    companyName: action.payload.companyName,
                    list: [product],
                };
                state.shoppingCartList.push(NewRecord);
            } else {
                let productIndex = state.shoppingCartList[
                    companyIndex
                ].list.findIndex(item => item.id == action.payload._id);
                if (productIndex == -1) {
                    state.shoppingCartList[companyIndex].list.push(product);
                } else {
                    state.shoppingCartList[companyIndex].list[
                        productIndex
                    ].count += 1;
                }
            }
            axios.post(
                `http://${HOST}:3000/user/updateShoppingCart`,
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
            let targetCompany = state.shoppingCartList.find(
                item => item.companyId === action.payload.companyId,
            );

            let del = state.shoppingCartList.indexOf(targetCompany);

            let productIndex = targetCompany.list.findIndex(
                item => item.id === action.payload.id,
            );

            if (action.payload.operation === '+') {
                targetCompany.list[productIndex].count += 1;
                state.basketTotal += action.payload.price;
            } else if (action.payload.operation === '-') {
                targetCompany.list[productIndex].count -= 1;
                state.basketTotal -= action.payload.price;
            } else {
                targetCompany.list.splice(productIndex, 1);
                state.basketTotal -=
                    action.payload.price * action.payload.count;
            }

            if (targetCompany.list.length === 0) {
                state.shoppingCartList.splice(del, 1);
            }

            axios.post(
                `http://${HOST}:3000/user/updateShoppingCart`,
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
            state.shoppingCartList.forEach(company => {
                company.list.forEach(product => {
                    state.basketTotal += product.price * product.count;
                });
            });
        },
        getShoppingCartList: (state, action) => {
            state.shoppingCartList = action.payload;
        },

        pay: (state, action) => {
            axios
                .post(
                    `http://${HOST}:3000/user/pay`,
                    {
                        _id: action.payload.userId,
                        shoppingCarts: state.shoppingCartList,
                    },
                    {
                        headers: {
                            'x-auth-token': action.payload.token,
                        },
                    },
                )
                .then(res => {
                    axios.post(
                        `http://${HOST}:3000/user/updateShoppingCart`,
                        {
                            _id: res.data._id,
                            shoppingCarts: [],
                        },
                        {
                            headers: {
                                'x-auth-token': action.payload.token,
                            },
                        },
                    );
                });
            state.shoppingCartList = [];
            state.basketTotal = 0;
        },
    },
});
export const {
    getShoppingCartList,
    addProduct,
    update,
    total,
    pay
} =
    shopSlice.actions;

export default shopSlice.reducer;
