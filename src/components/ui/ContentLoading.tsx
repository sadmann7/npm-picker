import { Fragment } from "react";
import ContentLoader, { type IContentLoaderProps } from "react-content-loader";

interface ExtendedIContentLoaderProps extends IContentLoaderProps {
  srText?: string;
  variant?: "rectangle" | "circle";
}

const ContentLoading = ({
  srText = "loading content",
  variant = "rectangle",
  ...props
}: ExtendedIContentLoaderProps) => {
  return (
    <Fragment>
      {srText ? <span className="sr-only">{srText}</span> : null}
      {variant === "rectangle" ? (
        <ContentLoader
          speed={2}
          width={70}
          height={15}
          viewBox="0 0 70 15"
          backgroundColor="#9ca3af"
          foregroundColor="#f3f4f6"
          {...props}
        >
          <rect x={0} y={0} rx={3} ry={3} width={65} height={15} />
        </ContentLoader>
      ) : (
        <ContentLoader
          speed={2}
          width={20}
          height={20}
          viewBox="0 0 20 20"
          backgroundColor="#9ca3af"
          foregroundColor="#f3f4f6"
          {...props}
        >
          <circle cx={9} cy={9} r={9} />
        </ContentLoader>
      )}
    </Fragment>
  );
};

export default ContentLoading;
