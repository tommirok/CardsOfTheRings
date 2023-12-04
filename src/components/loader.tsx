const Loader = () => {
  let circleCommonClasses = 'h-5 w-5 bg-gray-light rounded-full';
  return (
    <div className="flex m-9">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
