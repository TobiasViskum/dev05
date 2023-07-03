interface ViskumAppParams {
  params: {
    uid: Uid;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

interface ExtendedViskumAppParams {
  params: {
    uid: Uid;
    exerciseId: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}
