import React from 'react'

export default function MyFavourites({image,title,popularity,rating}) {
  return (
    <tbody className='space-y-2'>
    <tr className="align-middle border border-yellow-300 bg-blue-500 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 transition-all">
      <td className="p-4">
        <img
          className="w-16 h-auto rounded-md"
          src={`https://image.tmdb.org/t/p/original/${image}`}
          alt=""
        />
      </td>
      <td className="p-4 text-white font-semibold">
        {title}
      </td>
      <td className="p-4 text-white font-semibold">
        {popularity}
      </td>
      <td className="p-4 text-white font-semibold">
        {rating}
      </td>
    </tr>
  </tbody>

  

  )
}
