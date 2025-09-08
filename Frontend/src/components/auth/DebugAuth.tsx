import { useSelector, useDispatch } from "react-redux";
import { setAuthStatus } from "./authSlice";
import type { RootState } from "../../app/store";

export const DebugAuth = () => {
  const auth = useSelector((s: RootState) =>{
    console.log("s :", s)
    return s.auth
});
  const dispatch = useDispatch();

  return (
    <div>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
      <button className="w-full bg-blue-600 rounded-lg px-3 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
       onClick={() => dispatch(setAuthStatus("checking"))}>
        Set User
      </button>
    </div>
  );
};
