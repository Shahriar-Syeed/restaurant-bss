export default function HeadTable({children}) {
  return (
    <th scope="col" className="md:px-2  xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 font-bold">
      {children}
    </th>
  );
}
