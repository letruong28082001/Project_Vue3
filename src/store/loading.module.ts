export default {
  state: {
    load: false,
  },
  mutations: {},
  getters: {
    load: function (state: any) {
      return state.load;
    },
  },
  actions: {
    setLoading(context: any, display: boolean) {
      context.state.load = display;
    },
  },
};
