export function cardioDataParser(cardioDataUnparsed: CardioDataUnparsed[]) {
  for (let i = 0; i < cardioDataUnparsed.length; i++) {
    if (cardioDataUnparsed[i].time_amount != null) {
      cardioDataUnparsed[i].time_amount = JSON.parse(
        cardioDataUnparsed[i].time_amount
      );
    }
  }

  const cardioData: CardioData[] = JSON.parse(
    JSON.stringify(cardioDataUnparsed)
  );
  return cardioData;
}
