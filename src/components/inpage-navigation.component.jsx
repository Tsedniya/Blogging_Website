import { useState, useRef, useEffect } from "react";

const InPageNavigation = ({ routes,defaultHidden, defaultActiveIndex = 0 }) => {
    const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
    const activeTabLineRef = useRef();
    const activeTabRef = useRef();

    const changePageState = (btn, i) => {
        const { offsetWidth, offsetLeft } = btn;

        activeTabLineRef.current.style.width = `${offsetWidth}px`;
        activeTabLineRef.current.style.left = `${offsetLeft}px`;
        setInPageNavIndex(i);
    };

    useEffect(() => {
        if (activeTabRef.current) {
            changePageState(activeTabRef.current, defaultActiveIndex);
        }
    }, [defaultActiveIndex]);

    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {routes.map((route, i) => {
                    return (
                        <button
                            ref={i === defaultActiveIndex ? activeTabRef : null}
                            key={i}
                            className={`p-4 px-5 capitalize ${inPageNavIndex === i ? "text-black " : " text-dark-grey " + (defaultHidden.includes(route)? " md:hidden" :"")}`}
                            onClick={(e) => changePageState(e.currentTarget, i)}
                        >
                            {route}
                        </button>
                    );
                })}
                <hr ref={activeTabLineRef} className="absolute bottom duration-300" />
            </div>
        </>
    );
};

export default InPageNavigation;