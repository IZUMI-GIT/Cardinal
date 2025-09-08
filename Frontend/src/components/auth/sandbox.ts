
import { store } from "../../app/store";
import { setAuthUser, clearAuth, setAuthStatus } from "./authSlice";

console.log(store.getState().auth); // initial state

store.dispatch(setAuthStatus("checking"));
console.log(store.getState().auth.status); // should be "checking"

store.dispatch(setAuthUser({ id: 1, name: "Test", email: "t@test.com" }));
console.log(store.getState().auth.user); // should be {id:1,...}
console.log(store.getState().auth.status); // should be "authenticated"

store.dispatch(clearAuth());
console.log(store.getState().auth); // user null, status "unauthenticated"
