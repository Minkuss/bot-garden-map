import { BillboardDetailDto } from 'src/entities/billboard';
import { BillboardTypeEnum } from 'src/entities/billboard/enums/billboardTypeEnum';
import { BillboardStatusEnum } from 'src/entities/billboard/enums/billboardStatusEnum';

export function BillboardBalloonCard(billboardInfo: BillboardDetailDto | undefined) {
    return `
    <div class="balloon-card">
      <div class="balloon-card__image-wrapper">
        <img
          src="https://rpk-rostov.ru/wp-content/uploads/2021/10/fl1455871649-2048x1574-min-1024x787.jpg"
          alt="Баннер"
          class="balloon-card__image"
        />
      </div>
      <div class="balloon-card__info">
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
        <span>
          Занятость: ${billboardInfo?.status ? BillboardStatusEnum[billboardInfo?.status].name : 'Неизвестен'}
        </span>
      </div>
      <div class="balloon-card__button-group">
        <button class="balloon-card__button balloon-card__button--outlined balloon-card__dates-btn">Свободные даты</button>
        <button class="balloon-card__button balloon-card__button--outlined balloon-card__cart-btn">Добавить в корзину</button>
        <button class="balloon-card__button balloon-card__button--contained balloon-card__request-btn">Оставить заявку</button>
      </div>
    </div>
  `;
}
