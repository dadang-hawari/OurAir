import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-multi-date-picker'
import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function IsiDataPenumpang({
  penumpang,
  handlePenumpang,
  handleBerlakuSampaiChange,
  handleTanggalLahirChange,
}) {
  return (
    <div className="border rounded-md h-fit my-8 p-5 w-full">
      <b className="text-xl mb-3 block">Isi Data Penumpang</b>
      <div className="w-full text-gray-secondary">
        {penumpang.map((penumpangData) => (
          <div key={penumpangData?.id} className="mb-5">
            <h2 className="bg-gray-700 text-white rounded-t-md p-2 text-[600]">
              Data Diri {penumpangData?.id}
            </h2>
            <div className="w-full py-3 px-0 sm:p-3 flex flex-col gap-y-4">
              <div>
                <label className="font-bold" htmlFor={`title-${penumpangData?.id}`}>
                  Title
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute pointer-events-none text-gray-primary right-2 top-1/2 -translate-y-1/2 z-10"
                  />
                  <select
                    name="title"
                    id={`title-${penumpangData?.id}`}
                    className="w-full cursor-pointer border outline-none focus:border-secondary rounded-md h-10 appearance-none px-3 mt-1"
                    value={penumpangData?.title}
                    onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Miss">Miss</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold" htmlFor={`fullname-${penumpangData?.id}`}>
                  Nama Lengkap
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                  placeholder="Masukkan nama lengkap"
                  id={`fullname-${penumpangData?.id}`}
                  name="fullname"
                  value={penumpangData?.fullname}
                  onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                />
              </div>
              <div>
                <label className="font-bold" htmlFor={`surname-${penumpangData?.id}`}>
                  Nama Keluarga (opsional)
                </label>
                <input
                  type="text"
                  className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                  placeholder="Masukkan nama keluarga"
                  id={`surname-${penumpangData?.id}`}
                  name="surname"
                  value={penumpangData?.surname}
                  onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                />
              </div>
              <div className="relative">
                <label className="font-bold block" htmlFor={`birth_date-${penumpangData?.id}`}>
                  Tanggal Lahir
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <div className="relative">
                  <DatePicker
                    monthYearSeparator="-"
                    format="YYYY-MM-DD"
                    showOtherDays
                    highlightToday={false}
                    value={penumpangData?.birth_date}
                    onChange={(date) => handleTanggalLahirChange(date, penumpangData?.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-gray-400 absolute pointer-events-none right-3 -translate-y-1/2 top-1/2"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold" htmlFor={`nationality-${penumpangData?.id}`}>
                  Kewarganegaraan
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                  placeholder="Masukkan Kewarganegaraan"
                  id={`nationality-${penumpangData?.id}`}
                  name="nationality"
                  value={penumpangData?.nationality}
                  onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                />
              </div>
              <div>
                <label className="font-bold" htmlFor={`document-${penumpangData?.id}`}>
                  KTP/Paspor
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <input
                  type="number"
                  className="w-full border outline-none focus:border-secondary rounded-md h-10 ps-3 mt-1 py-4"
                  placeholder="Masukkan KTP/Paspor"
                  min={0}
                  id={`document-${penumpangData?.id}`}
                  name="document"
                  value={penumpangData?.document}
                  onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                />
              </div>
              <div>
                <label className="font-bold" htmlFor={`country_publication-${penumpangData?.id}`}>
                  Negara Penerbit
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute pointer-events-none text-gray-primary right-2 top-1/2 -translate-y-1/2 z-10"
                  />
                  <select
                    name="country_publication"
                    id={`country_publication-${penumpangData?.id}`}
                    className="w-full cursor-pointer border outline-none focus:border-secondary rounded-md h-10 appearance-none px-3 mt-1"
                    value={penumpangData?.country_publication}
                    onChange={(e) => handlePenumpang(e, penumpangData?.id)}
                  >
                    <option value="Singapore">Singapore</option>
                    <option value="Amerika">Amerika</option>
                    <option value="Indonesia">Indonesia</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <label
                  className="font-bold block"
                  htmlFor={`document_expired-${penumpangData?.id}`}
                >
                  Berlaku
                  <span className="text-red-500 font-normal" title="Perlu diisi">
                    *
                  </span>
                </label>
                <div className="relative">
                  <DatePicker
                    monthYearSeparator="-"
                    showOtherDays
                    highlightToday={false}
                    format="YYYY-MM-DD"
                    value={penumpangData?.document_expired}
                    onChange={(date) => handleBerlakuSampaiChange(date, penumpangData?.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-gray-400 absolute pointer-events-none right-3 -translate-y-1/2 top-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
