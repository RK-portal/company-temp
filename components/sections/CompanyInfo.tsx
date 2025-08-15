'use client'

import { type CompanyData } from '@/types/pages'

interface CompanyInfoProps {
  data: CompanyData
}

export default function CompanyInfo({ data }: CompanyInfoProps) {
  const formatAddress = () => {
    const { postal, prefecture, city, street, building } = data.address
    return `〒${postal} ${prefecture}${city}${street}${building ? ` ${building}` : ''}`
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    会社名
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.name}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    設立年月日
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.established}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    資本金
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.capital}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    従業員数
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.employees}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    代表取締役
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.president}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    事業内容
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <ul className="list-disc list-inside space-y-1">
                      {data.business.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    所在地
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatAddress()}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    電話番号
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.phone}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    FAX番号
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">{data.fax}</td>
                </tr>
                
                <tr>
                  <th className="bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-900">
                    メールアドレス
                  </th>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <a
                      href={`mailto:${data.email}`}
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {data.email}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}