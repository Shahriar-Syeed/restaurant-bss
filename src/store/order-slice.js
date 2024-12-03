import { createSlice } from "@reduxjs/toolkit";

const initialOrder = {
  orderDataTable: {},
  orderId: "",
  status: 0,
  preview: undefined,
  loading: false,
  error: null,
  lastPage: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrder,
  reducers: {
    setOrderDataTable(state, action) {
      state.orderDataTable = action.payload;
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
   
    setStatus(state, action) {
      state.status = action.payload;
    },
    removeOrderFromOrderDataTable(state, action) {
      state.orderDataTable.data = state.orderDataTable.data.filter(
        (item) => item.id !== action.payload
      );
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
    setLastPag(state, action) {
      state.lastPage = action.payload;
    },

    changeStatusOfOrder(state, action) {
      const existingIndex = state.orderDataTable.data.findIndex(
        (order) => order.id === action.payload.id
      );

      if (existingIndex !== -1) {
        const updatedOrderStatus = 
        action.payload.status === 1 ? 'Confirmed':
        action.payload.status === 2 ? 'Preparing':
        action.payload.status === 3 ? 'PreparedToServe':
        action.payload.status === 4 ? 'Served':
        action.payload.status === 5 ? 'Paid':
        'Pending';
        state.orderDataTable.data = state.orderDataTable.data.map(
          (order, index) =>
            index === existingIndex
              ? { ...order, orderStatus: updatedOrderStatus }
              : order
        );
        state.status = 0;
        state.orderId ='';
      }
    },
  },
});
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
