
import { status, axiosActions } from '../lib/const';
import {debug, info, warn, error } from '../lib/logging';
import Board from '@/models/Board';


export const state = () => ({
  activeColumnIndex: 0, 
  boards: [],
  activeBoardIndex: -1
})

export const mutations = {
  activeColumnIndex(state, index) {
    state.activeColumnIndex = index
  },
  setBoards(state, boards) {
    state.boards = boards
  },
  /**
   * activate one board
   */
  setBoard(state, board) {
    // we should store the data in the vuex-orm
//    console.log('Boards:', state.boards)
    let index = state.boards.findIndex( (b) => b.id === board.id);
    if (index < 0) {
      error(`board ${board.id} not found`)
      state.activeBoardIndex = -1
    } else {
      state.activeBoardIndex = index
//      info(`board activated: ${state.activeBoardIndex}`)      
    }    
  }

}

export const actions = {
  async activate(context, index) {
    context.commit('activeColumnIndex', index)
  },
  /**
   * dummy to check if the api is up and running
   */
  async getActive() {
    try {
      let res = await this.$axios.get('/');
      if (axiosActions.isOk(res)) {
        return axiosActions.data(res);
      } else {
        error(axiosActions.errors(res), 'board.getActive');
        throw new Error(axiosActions.errorMessage(res));
      }    
    }  catch(e) {
      error(e.message, 'board.getActive')
    }
  },

  /**
   * List the board visible to the current user   
   */
  async list({commit, getters}) {
    const FUN = 'store.board.list'
    try {
      let apiRes = await Board.api().get('/public/list')
      let res = apiRes.response
      if (axiosActions.isOk(res)) {
        commit('setBoards', axiosActions.data(res));
        commit('activeColumnIndex', 0)
        console.log('board-list', getters.boards[2])
        return getters.boards;
      }
      error(axiosActions.errors(res), FUN)
      return [];
    } catch(e) {
      error(e.message, FUN)
    }
  },

  /**
   * defines the current board by setting the id   
   * @param {*} data Object: {id}
   */
  async activate({commit, getters}, data) {
    const FUN = 'store.board.activate'
    try {
      let url = `/public/openById/${data.id}`
      console.log('board id: ', url)
      // let res = await this.$axios.get(`/public/openById/${data.id}`)    
      let apiRes = await Board.api().get(url)
      let res = apiRes.response;
      if (axiosActions.isOk(res)) {   
        let data = axiosActions.data(res)
        await Board.update({where: data.id, data: { title: 'the wrong one'}})   
        commit('setBoard', axiosActions.data(res));      
        console.log('board-activate.url', data);
        console.log('board-activate.stored', getters.boards[2])
        return getters.activeBoard;
      } else if (axiosActions.hasErrors(res)) {
        error(axiosActions.errors, FUN)
      } else {  
        warn(axiosActions.data(res), FUN)    
        return axiosActions.data(res)
      }
    } catch(e) {
      error(e.message, FUN)
    } 
  }
}
export const getters = {
  boards: state => {
    return state.boards;
  },
  activeColumnIndex: state => {
    return state.activeColumnIndex;
  },
  activeBoard: state => {
    if (state.activeBoardIndex < 0) {
      return {}
    } else {
      return state.boards[state.activeBoardIndex];
    }
  }
}

