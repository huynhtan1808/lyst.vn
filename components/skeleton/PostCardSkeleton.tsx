import classNames from 'classnames';

export const PostCardSkeleton = ({ isLoading }: { isLoading?: boolean }) => (
  <div
    className={classNames({
      'relative animate-pulse overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
        isLoading,
    })}
  >
    <div className="space-y-3">
      <div className="h-80 rounded-md bg-gray-100" />
      <div className="h-3 w-11/12 rounded-md bg-gray-100" />
      <div className="h-3 w-8/12 rounded-md bg-gray-100" />
    </div>
  </div>
);