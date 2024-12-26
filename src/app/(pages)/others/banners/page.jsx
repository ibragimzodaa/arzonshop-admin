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
    <div>
      <Input value={inpSearch} onChange={(e) => setInpSearch(e.target.value)} type="search" placeholder="search..." className="w-[300px]"/>
          <Dialog>
                    <DialogTrigger style={{backgroundColor: primary}} className='rounded-[5px] p-[10px] text-[white] ml-[1140px] mb-[50px]'>
                        Add color
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>color adding</DialogTitle>                                
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <Input type="text" className='border-[1px] border-[gray]' placeholder='color name' name="color" id="" />
                            <Button type="submit" variant="primary">Submit</Button>
                        </form>
                    </DialogContent>
                </Dialog>
      <table>
        <thead>
          <tr>
          <th>ColorName</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      {colors.filter((el)=> el.colorName.toLowerCase().includes(inpSearch)).map((el) => {
        return <tr key={el.id}>
          <td>{el.colorName}</td>
          <td >
                  {" "}
                  <div
                  onClick={() => deleteColors(el.id)}
                     className="bg-[white] hover:bg-[white]"
                  >
                    <Trash2 className="text-[red]" />
                  </div>
                  <Dialog>
              <DialogTrigger>
              <div className="bg-[white] hover:bg-[white]">
                    <Pencil style={{ color: primary }} />
                  </div>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>color edit</DialogTitle>                                
                  </DialogHeader>
                  <form onSubmit={(e) => {handleSubmit2(e,el.id)}}>
                      <Input type="text" className='border-[1px] border-[gray]' placeholder='color name' name="color" id="" />
                      <Button type="submit" variant="primary">Submit</Button>
                  </form>
              </DialogContent>
          </Dialog>
                </td>
        </tr>
      })}
      </tbody>
      </table>
    </div>
  )
}
