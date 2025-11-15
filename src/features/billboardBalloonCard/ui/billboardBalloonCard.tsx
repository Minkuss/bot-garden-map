import { BillboardDetailDto } from 'src/entities/billboard';
import { BillboardTypeEnum } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnum } from 'src/entities/billboard/enums/billboardStatusEnum';

export function BillboardBalloonCard(billboardInfo: BillboardDetailDto | undefined, isLastIndex: boolean) {
    return `
    <div class="balloon-card">
      <div class="balloon-card__image-wrapper">
        ${
            billboardInfo
                ? `
                    <img
                      src=${billboardInfo?.image_url}
                      alt="Баннер"
                      class="balloon-card__image"
                    />
                    <button
                        class="balloon-card__side-btn"
                    >
                        ${
                            isLastIndex
                                ? '<span><</span>'
                                : ''
                        }
                        Сторона ${billboardInfo?.side}
                        ${
                            !isLastIndex
                                ? '<span>></span>'
                                : ''
                        }
                    </button>`
                : '<span class="skeleton"/>'
        }
      </div>
      <div class="balloon-card__info">
        ${
            billboardInfo
                ? `
                    <span class="balloon-card__price">
                      Цена: ${billboardInfo?.rent_price ?? ''} руб/мес
                    </span>
                    <span>
                      Адрес: ${billboardInfo?.address ?? ''}
                    </span>
                    <span>
                      Размер: ${billboardInfo?.width ?? ''}x${billboardInfo?.height ?? ''}
                    </span>
                    <span>
                      Тип: ${billboardInfo?.type ? BillboardTypeEnum[billboardInfo?.type].name : 'Неизвестен'}
                    </span>
                    <p>
                      Занятость:${' '}
                      <span
                        class=${
                                billboardInfo?.status === 'available'
                                    ? 'status--available'
                                    : 'status--unavailable'
                            }
                      >
                        ${billboardInfo?.status ? BillboardStatusEnum[billboardInfo?.status].name : 'Неизвестен'}
                      </span>
                    </p>`
                : '<div class="skeleton"/>'
        }
      </div>
      <div class="balloon-card__button-group">
        <button
            class="balloon-card__button balloon-card__button--outlined balloon-card__cart-btn
                ${!billboardInfo ? 'balloon-card__button--disabled' : ''}"
        >
            Добавить в корзину
        </button>
        <button
            disabled=${!billboardInfo}
            class="balloon-card__button balloon-card__button--contained balloon-card__request-btn
                ${!billboardInfo ? 'balloon-card__button--disabled' : ''}"
        >
            Оставить заявку
        </button>
      </div>
    </div>
  `;
}
