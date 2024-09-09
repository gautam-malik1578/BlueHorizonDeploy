export const catchAsync = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch(next); //strange as fuck//
    //it is like .catch((err)=>next(err))//
  };
};
