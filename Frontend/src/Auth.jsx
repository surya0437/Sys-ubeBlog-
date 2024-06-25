

export default function Auth({children}) {
    const isLogin = localStorage.getItem("accessToken");
    if(isLogin){
        return children
    }else{
        window.location.href = '/login';
    }
}
