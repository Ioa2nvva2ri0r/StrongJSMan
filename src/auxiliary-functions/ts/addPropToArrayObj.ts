interface OProps {
  name?: string;
  id?: string | number;
}
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export function addPropToArrayObj<T extends OProps, R extends OProps, Return>(
  array: T[],
  ...props: R[]
): Return[] {
  return array.map((obj) => {
    // Concatenation of two objects
    return Object.assign(
      { ...obj },
      // Convert from array [key, value] to object
      Object.fromEntries(
        // Creating a new array and transforming objects in it
        Array.from(props, (o) =>
          // Decomposing an object as an array [key, value]
          (Object.entries(o) as Entries<{ [key: string]: OProps[] }>)
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
}
