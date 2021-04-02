import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';

export const initWeb3 = createAsyncThunk('InitWeb3', async (_, thunkAPI) => {
  try {
    if (Web3.givenProvider) {
      const web3 = new Web3(Web3.givenProvider);
      // await Web3.givenProvider.enable();

      await Web3.givenProvider.request({ method: 'eth_requestAccounts' });

      // const networkId = await web3.eth.net.getId();
      // console.log('networkId >>> ', networkId);
      // const network = CONTRACT_NAME.networks[networkId];
      // console.log('network >>> ', network);
      // const contract = new web3.eth.Contract(CONTRACT_NAME.abi, network.address);
      // console.log('contract >>> ', contract);
      // const addresses = await web3.eth.getAccounts();
      // console.log('addresses >>> ', addresses);

      // return {
      //   web3,
      //   contract: contract,
      //   address: addresses[0],
      // };
    } else {
      console.log('Error in loading web3');
    }
  } catch (error) {
    console.log('error >>> ', error);
  }
});

const initWeb3Slice = createSlice({
  name: 'InitWeb3Slice',
  initialState: {
    loading: false,
    web3: null,
    contract: null,
    account: null,
    web3Error: false,
    web3ErrorMessage: '',
  },
  extraReducers: {
    [initWeb3.pending]: (state, action) => {
      state.loading = true;
      state.web3Error = false;
    },
    [initWeb3.fulfilled]: (state, action) => {
      const { web3, contract, address } = action.payload;
      state.loading = false;
      state.web3Error = false;
      state.web3 = web3;
      state.contract = contract;
      state.address = address;
    },
    [initWeb3.rejected]: (state, action) => {
      state.loading = false;
      state.web3Error = true;
      state.web3ErrorMessage = action.error.message;
    },
  },
});

export const initWeb3Reducer = initWeb3Slice.reducer;
