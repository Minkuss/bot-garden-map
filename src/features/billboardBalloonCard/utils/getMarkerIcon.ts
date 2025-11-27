import { BillboardTypeEnumType } from 'src/entities/billboard/enums/billboardTypeEnum';

const getBannerSvg = (color: string) => `
<svg width="25" height="33" viewBox="0 0 25 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1.5C19.3513 1.5 24.5 6.64873 24.5 13C24.5 16.2097 23.1888 20.8768 21.0479 24.7432C19.9798 26.6718 18.7201 28.374 17.3408 29.5879C15.9608 30.8024 14.4949 31.5 13 31.5C11.5051 31.5 10.0392 30.8024 8.65918 29.5879C7.27988 28.374 6.02016 26.6718 4.95215 24.7432C2.81117 20.8768 1.5 16.2097 1.5 13C1.5 6.64873 6.64873 1.5 13 1.5Z" fill="white" stroke="${color}"/>
<path d="M19 9V21" stroke="${color}" stroke-width="1.73333" stroke-linecap="round"/>
<path d="M7 9V21" stroke="${color}" stroke-width="1.73333" stroke-linecap="round"/>
<g filter="url(#filter0_d_453_374)">
<rect x="7" y="9" width="12" height="9" rx="1" fill="${color}"/>
</g>
<defs>
<filter id="filter0_d_453_374" x="6.5" y="9" width="13" height="10.1" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="0.6"/>
<feGaussianBlur stdDeviation="0.25"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_374"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_374" result="shape"/>
</filter>
</defs>
</svg>
`;

const getPrismSvg = (color: string) => `
<svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 15.2097 22.1888 19.8768 20.0479 23.7432C18.9798 25.6718 17.7201 27.374 16.3408 28.5879C14.9608 29.8024 13.4949 30.5 12 30.5C10.5051 30.5 9.03924 29.8024 7.65918 28.5879C6.27988 27.374 5.02016 25.6718 3.95215 23.7432C1.81117 19.8768 0.5 15.2097 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5Z" fill="white" stroke="${color}"/>
<g filter="url(#filter0_d_453_384)">
<path d="M19.1169 9L16.5288 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter1_d_453_384)">
<path d="M17.5288 9L14.9406 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter2_d_453_384)">
<path d="M15.9407 9.00049L13.3525 19" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter3_d_453_384)">
<path d="M14.3525 9L11.7643 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter4_d_453_384)">
<path d="M12.7644 9L10.1762 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter5_d_453_384)">
<path d="M11.1763 9L8.58808 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter6_d_453_384)">
<path d="M9.58813 9L6.99994 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<g filter="url(#filter7_d_453_384)">
<path d="M7.58801 9L4.99982 18.9995" stroke="${color}" stroke-width="2" stroke-miterlimit="16" stroke-linecap="square"/>
</g>
<defs>
<filter id="filter0_d_453_384" x="15.3146" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter1_d_453_384" x="13.7264" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter2_d_453_384" x="12.1383" y="7.76514" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter3_d_453_384" x="10.5502" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter4_d_453_384" x="8.96204" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter5_d_453_384" x="7.3739" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter6_d_453_384" x="5.78577" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
<filter id="filter7_d_453_384" x="3.78564" y="7.76465" width="6.8166" height="14.2702" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feGaussianBlur stdDeviation="0.4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_384"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_384" result="shape"/>
</filter>
</defs>
</svg>
`;
const getScrollSvg = (color: string) => `
<svg width="25" height="31" viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0.5C19.3513 0.5 24.5 5.64873 24.5 12C24.5 15.2097 23.1888 19.8768 21.0479 23.7432C19.9798 25.6718 18.7201 27.374 17.3408 28.5879C15.9608 29.8024 14.4949 30.5 13 30.5C11.5051 30.5 10.0392 29.8024 8.65918 28.5879C7.27988 27.374 6.02016 25.6718 4.95215 23.7432C2.81117 19.8768 1.5 15.2097 1.5 12C1.5 5.64873 6.64873 0.5 13 0.5Z" fill="white" stroke="${color}"/>
<path d="M13 13V22" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
<g filter="url(#filter0_d_453_398)">
<rect x="7" y="7" width="12" height="13" rx="1" fill="${color}"/>
</g>
<defs>
<filter id="filter0_d_453_398" x="3" y="3.5" width="20" height="21" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="0.5"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_453_398"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_453_398" result="shape"/>
</filter>
</defs>
</svg>
`;

export const getMarkerSvgByType = (type: BillboardTypeEnumType, color: string): string => {
    switch (type) {
        case 'banner':
            return getBannerSvg(color);
        case 'prism':
            return getPrismSvg(color);
        case 'scroll':
            return getScrollSvg(color);
        default:
            return getBannerSvg(color);
    }
};
