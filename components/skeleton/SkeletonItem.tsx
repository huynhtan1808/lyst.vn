import classNames from 'classnames';


export const SkeletonItem = ({ isLoading }: { isLoading?: boolean }) => {

  return (
  <div
    className={classNames({
      'relative animate-pulse overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
        isLoading,
      })}
  >
    <div className="bg-gray-100 mb-4 h-8 w-52" />
  </div>
  );
};