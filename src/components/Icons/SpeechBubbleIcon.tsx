import { SVGAttributes } from "react";

interface SpeechBubbleIconProps extends SVGAttributes<SVGSVGElement> {
  height: string;
  className?: string;
}

const SpeechBubbleIcon = (props: SpeechBubbleIconProps) => {
  const { height, className } = props;
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3333 7.4585C10.9939 7.4585 6.6665 10.9741 6.6665 15.3128C6.6665 17.1857 7.47459 18.9001 8.81888 20.2482C8.34687 22.1513 6.76846 23.8468 6.74958 23.8657C6.6665 23.9525 6.64385 24.0809 6.69294 24.1942C6.74203 24.3075 6.84776 24.3754 6.96859 24.3754C9.47215 24.3754 11.3489 23.1746 12.2778 22.4345C13.5126 22.899 14.8833 23.1671 16.3333 23.1671C21.6727 23.1671 26.0002 19.6515 26.0002 15.3128C26.0002 10.9741 21.6727 7.4585 16.3333 7.4585ZM11.4999 16.5211C10.8315 16.5211 10.2916 15.9812 10.2916 15.3128C10.2916 14.6444 10.8315 14.1044 11.4999 14.1044C12.1683 14.1044 12.7083 14.6444 12.7083 15.3128C12.7083 15.9812 12.1683 16.5211 11.4999 16.5211ZM16.3333 16.5211C15.665 16.5211 15.125 15.9812 15.125 15.3128C15.125 14.6444 15.665 14.1044 16.3333 14.1044C17.0017 14.1044 17.5417 14.6444 17.5417 15.3128C17.5417 15.9812 17.0017 16.5211 16.3333 16.5211ZM21.1667 16.5211C20.4984 16.5211 19.9584 15.9812 19.9584 15.3128C19.9584 14.6444 20.4984 14.1044 21.1667 14.1044C21.8351 14.1044 22.3751 14.6444 22.3751 15.3128C22.3751 15.9812 21.8351 16.5211 21.1667 16.5211Z"
        fill="#979797"
      />
    </svg>
  );
};

export default SpeechBubbleIcon;
