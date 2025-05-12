import { Link } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
//# the commented thing will happen after sign in session works all appear b/c of that
// import { UserContext } from "../App";
// import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  /*const { userAuth: { username } } = useContext(UserContext);
    const signOutUser = () removeFromSession(key:any): void
       removeFromSession("user");
       setUserAuth({ access_token: null })*/
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden">
          <i className="fi fi-rr-file-edit"></i>
          <p>Create Post</p>
        </Link>

        {/* Commenting out the Profile link */}
        {/* 
                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>
                */}

        <Link to="/dashboard/blogs" className="link pl-8 py-4">
          Dashboard
        </Link>

        <Link to="/settings/edit-profile" className="link pl-8 ">
          Settings
        </Link>

        <span className="absolute border-t border-grey w-[200%]"></span>

        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>

          {/* Commenting out the username display */}
          {/* <p className="text-dark-grey">@{ username }</p> */}
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
