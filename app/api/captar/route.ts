import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(){
  return NextResponse.json({ok:true, msg:"Robô online"})
}

export async function POST(req: Request){
  try{
    const body = await req.json()
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data, error } = await supabase.from('proprietarios_leads').insert([{
      bairro: body.bairro,
      preco: body.preco,
      origem: body.origem || 'OLX',
      whatsapp_dono: body.whatsapp_dono,
      link_anuncio: body.link_anuncio,
      status: 'novo'
    }]).select()
    if(error) return NextResponse.json({ok:false, error: error.message}, {status:500})
    return NextResponse.json({ok:true, data})
  }catch(e:any){
    return NextResponse.json({ok:false, error: e.message}, {status:500})
  }
}
