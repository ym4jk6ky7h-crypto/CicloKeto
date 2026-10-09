import { APP_NAME, iconUrl } from "./brand.js";

export function AppLogo({ size = 44, className = "" }) {
  return (
    <img
      className={`app-logo ${className}`}
      src={iconUrl("icon-192.png")}
      alt={APP_NAME}
      width={size}
      height={size}
    />
  );
}
