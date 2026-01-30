// 工具函数：将 HEX 转换为 HSL
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// 工具函数：将 HSL 转换为 HEX
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${Math.round(f(0) * 255).toString(16).padStart(2, '0')}${Math.round(f(8) * 255).toString(16).padStart(2, '0')}${Math.round(f(4) * 255).toString(16).padStart(2, '0')}`;
}

// 主函数：生成 primary-color-1, -3, -5
export function generatePrimaryColors(primaryColor) {
  const [h, s, l] = hexToHsl(primaryColor);

  return {
    'primary-light-1': hslToHex(h, s, Math.min(90, l + 10)),
    'primary-light-2': hslToHex(h, s, Math.min(90, l + 20)),
    'primary-light-3': hslToHex(h, s, Math.min(90, l + 30)), 
    'primary-light-4': hslToHex(h, s, Math.min(90, l + 40)),
    'primary-light-5': hslToHex(h, s, Math.min(90, l + 50)),
    'primary-light-6': hslToHex(h, s, Math.min(90, l + 60)),
    'primary-light-7': hslToHex(h, s, Math.min(90, l + 70)), 
    'primary-light-8': hslToHex(h, s, Math.min(90, l + 80)), 
    'primary-light-9': hslToHex(h, s, Math.min(90, l + 90)),
    'primary-dark-1': hslToHex(h, s, Math.max(10, l - 10)),
    'primary-dark-2': hslToHex(h, s, Math.max(10, l - 20)),
    'primary-dark-3': hslToHex(h, s, Math.max(10, l - 30)),
    'primary-dark-4': hslToHex(h, s, Math.max(10, l - 40)),
    'primary-dark-5': hslToHex(h, s, Math.max(10, l - 50)),
    'primary-dark-6': hslToHex(h, s, Math.max(10, l - 60)),
    'primary-dark-7': hslToHex(h, s, Math.max(10, l - 70)),
    'primary-dark-8': hslToHex(h, s, Math.max(10, l - 80)),
    'primary-dark-9': hslToHex(h, s, Math.max(10, l - 90))
  };
}