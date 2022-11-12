type ObjProps = { name?: string; id?: string | number }[];
type FunProps = (
  array: ObjProps,
  ...props: { [key: string]: ObjProps }[]
) => any[];

export const addPropToArrayObj: FunProps = (array, ...props) =>
  array.map((obj) => {
    // Конкатинация двух объектов
    return Object.assign(
      { ...obj },
      // Преобразование из массива [ключ, значение] в объект
      Object.fromEntries(
        // Создание нового массива и преобразование объектов в нём
        Array.from(props, (o) =>
          // Разложение объекта в ввиде массива [ключ, значение]
          Object.entries(o)
            .map(([key, value]) => [
              key,
              value.filter(({ name, id }) =>
                name ? name === obj.name : id === obj.id
              )[0],
            ])
            .filter(([key, value]) => value !== undefined)
        ).flat()
      )
    );
  });
