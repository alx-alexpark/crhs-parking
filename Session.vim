let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Programs/Web/crhs-parking
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +13 ~/Programs/Web/crhs-parking/app/api/v1/getParkingAvailability/route.ts
badd +113 ~/Programs/Web/crhs-parking/app/(student)/parking-request/page.tsx
badd +32 ~/Programs/Web/crhs-parking/app/(student)/parking-request/_components/parking-spot.tsx
badd +52 models/ParkingSpotRequest.ts
badd +307 ~/Programs/Web/crhs-parking/components/ParkingMap/parking-map.tsx
badd +15 components/ParkingMap/parking-map.module.scss
badd +93 ~/Programs/Web/crhs-parking/app/(student)/form/about-me/page.tsx
badd +12 ~/Programs/Web/crhs-parking/app/(student)/parking-request/_components/payment.tsx
badd +32 app/(student)/form/form.module.scss
badd +14 ~/Programs/Web/crhs-parking/app/(student)/parking-request/parking-request.module.scss
badd +36 ~/Programs/Web/crhs-parking/app/(student)/parking-request/_components/vehicle-information.tsx
badd +14 ~/Programs/Web/crhs-parking/components/FileInput/file-input.tsx
badd +9 .prettierrc.toml
argglobal
%argdel
edit .prettierrc.toml
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 30 + 82) / 165)
exe 'vert 2resize ' . ((&columns * 67 + 82) / 165)
exe 'vert 3resize ' . ((&columns * 66 + 82) / 165)
argglobal
enew
file NvimTree_1
balt ~/Programs/Web/crhs-parking/app/(student)/parking-request/_components/parking-spot.tsx
setlocal fdm=manual
setlocal fde=
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt ~/Programs/Web/crhs-parking/app/(student)/form/about-me/page.tsx
setlocal fdm=manual
setlocal fde=
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 7 - ((6 * winheight(0) + 19) / 39)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("~/Programs/Web/crhs-parking/app/(student)/parking-request/parking-request.module.scss", ":p")) | buffer ~/Programs/Web/crhs-parking/app/(student)/parking-request/parking-request.module.scss | else | edit ~/Programs/Web/crhs-parking/app/(student)/parking-request/parking-request.module.scss | endif
if &buftype ==# 'terminal'
  silent file ~/Programs/Web/crhs-parking/app/(student)/parking-request/parking-request.module.scss
endif
balt ~/Programs/Web/crhs-parking/components/FileInput/file-input.tsx
setlocal fdm=manual
setlocal fde=
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 14 - ((13 * winheight(0) + 19) / 39)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 0
wincmd w
3wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 82) / 165)
exe 'vert 2resize ' . ((&columns * 67 + 82) / 165)
exe 'vert 3resize ' . ((&columns * 66 + 82) / 165)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
