'use client'
import { primary } from '@/components/theme/theme'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useColor } from '@/store/color'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function Banners() {
  let {colors,getColors,deleteColors,postColor,putColors} = useColor()
  let [inpSearch, setInpSearch] = useState("")
  useEffect(() => {
    getColors()
  },[])
  function handleSubmit(e) {
    e.preventDefault()
    postColor(e.target["color"].value)
  }
  function handleSubmit2(e,id) {
    e.preventDefault()
    putColors(e.target["color"].value,id)
  }
  return (
      <div className="p-4">
    <Input
      value={inpSearch}
      onChange={(e) => setInpSearch(e.target.value)}
      type="search"
      placeholder="Search colors..."
      className="w-[300px] mb-4 p-2 border rounded"
    />
    <div className='flex w-[1000px] justify-between md:flex-col-reverse md:ml-[-30px] md:w-auto md:gap-[30px]'>
    <table className="w-[500px] border-collapse border border-gray-200 md:w-[350px]">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border border-gray-200">Color Name</th>
          <th className="p-2 border border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {colors
          .filter((el) => el.colorName.toLowerCase().includes(inpSearch.toLowerCase()))
          .map((el) => (
            <tr key={el.id} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-200">{el.colorName}</td>
              <td className="p-2 border border-gray-200 flex space-x-2">
                {/* Delete Color */}
                <div
                  onClick={() => deleteColors(el.id)}
                  className="cursor-pointer text-red-500"
                  title="Delete Color"
                >
                  <Trash2 />
                </div>
                <Dialog>
                  <DialogTrigger className="cursor-pointer" title="Edit Color">
                    <Pencil style={{ color: primary }} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Color</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => handleSubmit2(e, el.id)}
                      className="space-y-4"
                    >
                      <Input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Color name"
                        name="color"
                        defaultValue={el.colorName}
                      />
                      <Button type="submit" variant="primary" className="w-full">
                        Submit
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Add a Color</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Color name"
          name="color"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  </div>

  )
}
