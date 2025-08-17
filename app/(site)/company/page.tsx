import { type Metadata } from 'next'
import Script from 'next/script'

import GoogleMap from '@/components/integrations/GoogleMap'
import CompanyInfo from '@/components/sections/CompanyInfo'
import PageHero from '@/components/sections/PageHero'
import Timeline from '@/components/sections/Timeline'
import { companyConfig, aboutConfig } from '@/config'
import { generatePageMetadata } from '@/lib/metadata'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: aboutConfig.metadata.title,
  description: aboutConfig.metadata.description,
  keywords: aboutConfig.metadata.keywords,
})

export default function CompanyPage() {
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <PageHero
        title={aboutConfig.hero.title}
        subtitle={aboutConfig.hero.subtitle}
        image={aboutConfig.hero.backgroundImage}
        breadcrumb={[
          { id: 'home', label: 'ホーム', href: '/' },
          { id: 'company', label: aboutConfig.hero.title, href: '/company' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {aboutConfig.introduction.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {aboutConfig.introduction.content}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            会社概要
          </h2>
          <CompanyInfo data={{
            name: companyConfig.name,
            established: companyConfig.details.established,
            capital: companyConfig.details.capital,
            employees: companyConfig.details.employees,
            president: companyConfig.details.president,
            business: companyConfig.details.business,
            address: companyConfig.address,
            phone: companyConfig.contact.tel,
            fax: companyConfig.contact.fax,
            email: companyConfig.contact.email,
            coordinates: companyConfig.coordinates,
            history: companyConfig.history,
          }} />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
            沿革
          </h2>
          <Timeline items={companyConfig.history} />
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              {aboutConfig.philosophy.title}
            </h2>
            
            <div className="space-y-8">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-primary-600">
                  {aboutConfig.philosophy.mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  「{aboutConfig.philosophy.mission.content}」
                  <br />
                  {aboutConfig.philosophy.mission.description}
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-primary-600">
                  {aboutConfig.philosophy.vision.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  「{aboutConfig.philosophy.vision.content}」
                  <br />
                  {aboutConfig.philosophy.vision.description}
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-primary-600">
                  {aboutConfig.philosophy.values.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {aboutConfig.philosophy.values.items.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-primary-600">■</span>
                      <span>{value.title} - {value.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 lg:text-4xl">
              アクセス
            </h2>
            
            <div className="mb-8">
              <GoogleMap
                center={companyConfig.coordinates}
                height={aboutConfig.access.map.height}
                markers={[
                  {
                    position: companyConfig.coordinates,
                    title: companyConfig.name,
                    description: companyConfig.address.full,
                  },
                ]}
              />
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                交通アクセス
              </h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900">{aboutConfig.access.transportation.train.title}</h4>
                  {companyConfig.access.train.map((info, index) => (
                    <p key={index}>{info}</p>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{aboutConfig.access.transportation.car.title}</h4>
                  {companyConfig.access.car.map((info, index) => (
                    <p key={index}>{info}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}