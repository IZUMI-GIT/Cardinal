import { store } from "../../app/store";
import { clearAuth, setAuthError, setAuthStatus, setAuthUser } from "./authSlice";


console.log(store.getState().auth);

store.dispatch(setAuthUser({
    id: 1,
    email: "hello.world@gmail.com",
    username: "hellow91",
    role: "user"
}))
console.log(store.getState().auth);

store.dispatch(clearAuth());
console.log(store.getState().auth);

store.dispatch(setAuthStatus("loading"))
console.log(store.getState().auth.status)

store.dispatch(setAuthError(null))
console.log(store.getState().auth)