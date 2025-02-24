import { Icon, IconProps } from "@chakra-ui/react";

export const AnimationIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0_72_177)">
      <path
        opacity="0.25"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.2266 10.2268C2.21933 11.012 0 13.7469 0 17.0002C0 20.8662 3.13401 24.0002 7 24.0002C10.2533 24.0002 12.9882 21.7809 13.7734 18.7736C13.4158 18.867 13.0471 18.9328 12.6697 18.9686C11.855 21.3155 9.62424 23.0002 7 23.0002C3.68629 23.0002 1 20.3139 1 17.0002C1 14.376 2.68473 12.1452 5.03162 11.3305C5.06744 10.9531 5.13324 10.5844 5.2266 10.2268Z"
        fill="currentColor"
      />
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2266 5.22681C7.21933 6.01199 5 8.74692 5 12.0002C5 15.8662 8.13401 19.0002 12 19.0002C15.2533 19.0002 17.9882 16.7809 18.7734 13.7736C18.4158 13.867 18.0471 13.9328 17.6697 13.9686C16.855 16.3155 14.6242 18.0002 12 18.0002C8.68629 18.0002 6 15.3139 6 12.0002C6 9.37597 7.68473 7.14523 10.0316 6.33055C10.0674 5.9531 10.1332 5.58438 10.2266 5.22681Z"
        fill="currentColor"
      />
      <path
        d="M23.5 7.0001C23.5 10.59 20.5899 13.5001 17 13.5001C13.4101 13.5001 10.5 10.59 10.5 7.0001C10.5 3.41025 13.4101 0.500103 17 0.500103C20.5899 0.500103 23.5 3.41025 23.5 7.0001Z"
        stroke="currentColor"
      />
      <path d="M17 4L15 9" stroke="currentColor" strokeLinecap="round" />
      <path d="M17 4L19 9" stroke="currentColor" strokeLinecap="round" />
      <path d="M16 7.5H18" stroke="currentColor" strokeLinecap="round" />
    </g>
    <defs>
      <clipPath id="clip0_72_177">
        <rect width="24" height="24" fill="currentColor" />
      </clipPath>
    </defs>
  </Icon>
);

export const ArrowAltIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M17.5858 8H6.41421C5.52331 8 5.07714 9.07714 5.70711 9.70711L11.2929 15.2929C11.6834 15.6834 12.3166 15.6834 12.7071 15.2929L18.2929 9.70711C18.9229 9.07714 18.4767 8 17.5858 8Z"
      fill="currentColor"
    />
  </Icon>
);

export const ArrowIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 12H20" stroke="currentColor" strokeLinecap="round" />
    <path d="M4 12L10 18" stroke="currentColor" strokeLinecap="round" />
    <path d="M4 12L10 6" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const BackgroundIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0_72_156)">
      <path d="M2 1L1 2" stroke="currentColor" strokeLinecap="round" />
      <path d="M23 22L22 23" stroke="currentColor" strokeLinecap="round" />
      <path d="M14 1L1 14" stroke="currentColor" strokeLinecap="round" />
      <path d="M23 10L10 23" stroke="currentColor" strokeLinecap="round" />
      <path d="M8 1L1 8" stroke="currentColor" strokeLinecap="round" />
      <path d="M23 16L16 23" stroke="currentColor" strokeLinecap="round" />
      <path d="M20 1L1 20" stroke="currentColor" strokeLinecap="round" />
      <path d="M23 4L4 23" stroke="currentColor" strokeLinecap="round" />
    </g>
    <defs>
      <clipPath id="clip0_72_156">
        <rect width="24" height="24" rx="10" fill="currentColor" />
      </clipPath>
    </defs>
  </Icon>
);

export const BackIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 12L15 18" stroke="currentColor" strokeLinecap="round" />
    <path d="M9 12L15 6" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const CheckIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M7.5 11.5L11 15" stroke="currentColor" strokeLinecap="round" />
    <path d="M17 9L11 15" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </Icon>
);

export const CloseIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M5 5L19 19" stroke="currentColor" strokeLinecap="round" />
    <path d="M19 5L5 19" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const EditIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4.68255 22L2.99999 22C2.44771 22 2 21.5523 2 21V19.3174C2 19.0522 2.10536 18.7978 2.29289 18.6103L14.1961 6.70712C14.5866 6.3166 15.2198 6.3166 15.6103 6.70712L17.2929 8.38966C17.6834 8.78019 17.6834 9.41336 17.2929 9.80388L5.38966 21.7071C5.20212 21.8946 4.94777 22 4.68255 22Z"
      fill="currentColor"
    />
    <path
      d="M18.5658 7.29287L17.6366 6.36364L16.7073 5.43457C16.3167 5.04407 16.3166 4.41085 16.7072 4.02029L18.0202 2.70716C18.4107 2.31661 19.0439 2.3166 19.4344 2.70714L21.2929 4.56566C21.6834 4.95618 21.6834 5.58933 21.2929 5.97985L19.98 7.29285C19.5895 7.68339 18.9563 7.6834 18.5658 7.29287Z"
      fill="currentColor"
    />
  </Icon>
);

export const FileIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const HomeIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <mask id="path-1-inside-1_72_131" fill="currentColor">
      <path d="M5 15H19V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V15Z" />
    </mask>
    <path
      d="M5 15H19H5ZM20 19C20 21.2091 18.2091 23 16 23H8C5.79086 23 4 21.2091 4 19H6C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19H20ZM8 23C5.79086 23 4 21.2091 4 19V15H6V19C6 20.1046 6.89543 21 8 21V23ZM20 15V19C20 21.2091 18.2091 23 16 23V21C17.1046 21 18 20.1046 18 19V15H20Z"
      fill="currentColor"
      mask="url(#path-1-inside-1_72_131)"
    />
    <path d="M5.5 17V12" stroke="currentColor" strokeLinecap="round" />
    <path d="M18.5 17V12" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M2.5 11.5L10.5858 3.41421C11.3668 2.63316 12.6332 2.63316 13.4142 3.41421L21.5 11.5"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <rect
      x="9.5"
      y="15.5"
      width="5"
      height="6"
      rx="0.5"
      stroke="currentColor"
    />
  </Icon>
);

export const ImageIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <rect
      x="2.5"
      y="2.5"
      width="19"
      height="19"
      rx="3.5"
      stroke="currentColor"
    />
    <path
      d="M2.5 14.5L7.29289 9.70711C7.68342 9.31658 8.31658 9.31658 8.70711 9.70711L13.7929 14.7929C14.1834 15.1834 14.8166 15.1834 15.2071 14.7929L17.7929 12.2071C18.1834 11.8166 18.8166 11.8166 19.2071 12.2071L21.5 14.5"
      stroke="currentColor"
    />
    <circle cx="15" cy="8" r="2.5" stroke="currentColor" />
  </Icon>
);

export const InboxIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M22 12H16.5352C16.2008 12 15.8886 12.1671 15.7031 12.4453L14.2969 14.5547C14.1114 14.8329 13.7992 15 13.4648 15H10.5352C10.2008 15 9.8886 14.8329 9.70313 14.5547L8.29687 12.4453C8.1114 12.1671 7.79917 12 7.46482 12H2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const LogoutIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M14 3L7 3C5.89543 3 5 3.89543 5 5L5 19C5 20.1046 5.89543 21 7 21L14 21"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path d="M10 12L20 12" stroke="currentColor" strokeLinecap="round" />
    <path d="M20 12L16 8" stroke="currentColor" strokeLinecap="round" />
    <path d="M20 12L16 16" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const MailIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <rect
      x="3.5"
      y="5.5"
      width="17"
      height="13"
      rx="1.5"
      stroke="currentColor"
    />
    <path
      d="M4 6L11.3415 12.4238C11.7185 12.7537 12.2815 12.7537 12.6585 12.4238L20 6"
      stroke="currentColor"
    />
  </Icon>
);

export const PersonIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" />
    <path
      d="M4.5 20C4.5 16.4101 7.41015 13.5 11 13.5H13C16.5899 13.5 19.5 16.4101 19.5 20V20.5H4.5V20Z"
      stroke="currentColor"
    />
  </Icon>
);

export const ProhibitIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" />
    <path d="M19 5L5 19" stroke="currentColor" />
  </Icon>
);

export const PromptIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0_72_173)">
      <path
        d="M9 7L12.25 7C13.7688 7 15 8.23122 15 9.75V9.75C15 11.2688 13.7688 12.5 12.25 12.5L9 12.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 7V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 1H3C1.89543 1 1 1.89543 1 3V21C1 22.1046 1.89543 23 3 23H21C22.1046 23 23 22.1046 23 21V3C23 1.89543 22.1046 1 21 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        stroke-dasharray="4 4"
      />
    </g>
    <defs>
      <clipPath id="clip0_72_173">
        <rect width="24" height="24" fill="currentColor" />
      </clipPath>
    </defs>
  </Icon>
);

export const PromptThreeLinesIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <g opacity="0.5">
      <mask
        id="mask0_72_137"
        maskUnits="userSpaceOnUse"
        x="2"
        y="12"
        width="20"
        height="10"
        style={{ maskType: "alpha" }}
      >
        <rect
          x="2.5"
          y="12.5"
          width="19"
          height="9"
          rx="2.5"
          stroke="currentColor"
        />
        <path d="M7 15H17" stroke="currentColor" strokeLinecap="round" />
        <path d="M6 17H18" stroke="currentColor" strokeLinecap="round" />
        <path d="M8 19H16" stroke="currentColor" strokeLinecap="round" />
      </mask>
      <g mask="url(#mask0_72_137)">
        <rect
          x="2.5"
          y="13.5"
          width="19"
          height="8"
          fill="currentColor"
          stroke="currentColor"
        />
      </g>
    </g>
    <rect
      x="0.5"
      y="2.5"
      width="23"
      height="11"
      rx="2.5"
      stroke="currentColor"
    />
    <path d="M4 6H20" stroke="currentColor" strokeLinecap="round" />
    <path d="M4 8H20" stroke="currentColor" strokeLinecap="round" />
    <path d="M6 10H18" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const PuzzleIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M18 6H15.8486C15.3511 6 15 5.49751 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 5.49751 8.6488 6 8.1513 6H6C5.44771 6 5 6.44772 5 7V9.1513C5 9.6488 4.49751 10 4 10C2.34315 10 1 11.3431 1 13C1 14.6569 2.34315 16 4 16C4.49751 16 5 16.3511 5 16.8486V19C5 19.5523 5.44771 20 6 20H18C18.5523 20 19 19.5523 19 19V16.8486C19 16.3511 18.4975 16 18 16C16.3431 16 15 14.6569 15 13C15 11.3431 16.3431 10 18 10C18.4975 10 19 9.6488 19 9.1513V7C19 6.44772 18.5523 6 18 6Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const RankingIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M18.1958 6H11.8042C11.0188 6 10.54 6.86395 10.9562 7.53L14.152 12.6432C14.5437 13.2699 15.4563 13.2699 15.848 12.6432L19.0438 7.53C19.46 6.86395 18.9812 6 18.1958 6Z"
      stroke="currentColor"
    />
    <path
      d="M5.80425 18L12.1958 18C12.9812 18 13.46 17.136 13.0438 16.47L9.848 11.3568C9.45633 10.7301 8.54367 10.7301 8.152 11.3568L4.95625 16.47C4.53997 17.136 5.01881 18 5.80425 18Z"
      stroke="currentColor"
    />
  </Icon>
);

export const SearchIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="10.5882" cy="10.5882" r="6.08824" stroke="currentColor" />
    <path
      d="M15.6477 14.9406L15.2942 14.5871L14.5871 15.2942L14.9406 15.6477L15.6477 14.9406ZM19.6465 20.3536C19.8418 20.5489 20.1584 20.5489 20.3536 20.3536C20.5489 20.1584 20.5489 19.8418 20.3536 19.6465L19.6465 20.3536ZM14.9406 15.6477L19.6465 20.3536L20.3536 19.6465L15.6477 14.9406L14.9406 15.6477Z"
      fill="currentColor"
    />
  </Icon>
);

export const SirenIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M19 21V15C19 12.1997 19 10.7996 18.5231 9.73C18.1037 8.78924 17.4345 8.02433 16.6113 7.54497C15.6754 7 14.4503 7 12 7C9.54977 7 8.32466 7 7.38879 7.54497C6.56559 8.02433 5.89629 8.78924 5.47685 9.73C5 10.7996 5 12.1997 5 15V21"
      stroke="currentColor"
    />
    <path
      d="M15 9.81494C16.23 9.81494 17.23 10.77 17.1851 12"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path d="M2 21H22" stroke="currentColor" strokeLinecap="round" />
    <path d="M12 1V4" stroke="currentColor" strokeLinecap="round" />
    <path d="M20 3L18.5 4.5" stroke="currentColor" strokeLinecap="round" />
    <path d="M4 3L5.5 4.5" stroke="currentColor" strokeLinecap="round" />
    <path d="M12 18V21" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const StarIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M11.0692 3.36919L9.24921 8.00202C9.09887 8.3847 8.72961 8.63636 8.31846 8.63636H3.4959C2.59374 8.63636 2.15284 9.7368 2.80542 10.3597L6.57384 13.9568C6.83682 14.2079 6.94285 14.5819 6.85073 14.9336L5.5867 19.7599C5.36461 20.6078 6.26339 21.3109 7.03292 20.8911L11.5211 18.443C11.8196 18.2802 12.1804 18.2802 12.4789 18.443L16.9671 20.8911C17.7366 21.3109 18.6354 20.6078 18.4133 19.7599L17.1493 14.9336C17.0572 14.5819 17.1632 14.2079 17.4262 13.9568L21.1946 10.3597C21.8472 9.7368 21.4063 8.63636 20.5041 8.63636H15.6815C15.2704 8.63636 14.9011 8.3847 14.7508 8.00202L12.9308 3.36919C12.5985 2.52339 11.4015 2.52339 11.0692 3.36919Z"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </Icon>
);

export const TextEditorIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <mask id="path-1-inside-1_72_150" fill="currentColor">
      <path d="M2 7C2 5.34315 3.34315 4 5 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H5C3.34315 22 2 20.6569 2 19V7Z" />
    </mask>
    <path
      d="M2 4H20H2ZM20 19C20 21.2091 18.2091 23 16 23H5C2.79086 23 1 21.2091 1 19H3C3 20.1046 3.89543 21 5 21H17C18.6569 21 20 20.1046 20 19ZM5 23C2.79086 23 1 21.2091 1 19V8C1 5.79086 2.79086 4 5 4C3.89543 4 3 5.34315 3 7V19C3 20.1046 3.89543 21 5 21V23ZM20 4V22V4Z"
      fill="currentColor"
      mask="url(#path-1-inside-1_72_150)"
    />
    <path
      d="M4.5 5C4.5 3.61929 5.61929 2.5 7 2.5H19C20.3807 2.5 21.5 3.61929 21.5 5V17C21.5 18.3807 20.3807 19.5 19 19.5H7C5.61929 19.5 4.5 18.3807 4.5 17V5Z"
      stroke="currentColor"
    />
    <path d="M7 8H19" stroke="currentColor" strokeLinecap="round" />
    <path d="M7 11H15" stroke="currentColor" strokeLinecap="round" />
    <path d="M7 14H17" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);

export const TextIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0_72_165)">
      <path
        d="M8 1H3C1.89543 1 1 1.89543 1 3V8"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M16 23L21 23C22.1046 23 23 22.1046 23 21L23 16"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M23 8L23 3C23 1.89543 22.1046 1 21 1L16 1"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M1 16L1 21C1 22.1046 1.89543 23 3 23L8 23"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M7 7H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_72_165">
        <rect width="24" height="24" fill="currentColor" />
      </clipPath>
    </defs>
  </Icon>
);

export const TrashIcon = ({
  isChecked,
  isIndeterminate,
  ...props
}: IconProps & { isChecked?: boolean; isIndeterminate?: boolean }) => (
  <Icon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 6H21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 10V18" stroke="currentColor" strokeLinecap="round" />
    <path d="M12 10V18" stroke="currentColor" strokeLinecap="round" />
    <path d="M15 10V18" stroke="currentColor" strokeLinecap="round" />
  </Icon>
);
