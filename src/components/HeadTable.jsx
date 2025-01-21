export default function HeadTable({children}) {
  return (
    <th scope="col" className={`md:px-2  xl:px-4 xl:py-3 lg:px-3 lg:py-2 p-1 font-bold ${children === 'Image' && 'lg:w-[4rem] md:w-[3.5rem] sm:w-[3.25rem]'}`}>
      {children}
    </th>
  );
}
