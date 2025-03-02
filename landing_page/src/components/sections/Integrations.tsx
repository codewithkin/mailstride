'use client'
import { motion } from 'framer-motion'
import { 
  SiMailchimp, 
  SiGithub, 
  SiSlack, 
  SiZapier, 
  SiStripe, 
  SiNotion,
  SiAirtable,
  SiIntercom,
  SiWordpress,
  SiShopify,
  SiWebflow,
  SiHubspot
} from 'react-icons/si'

const integrations = [
  {
    name: 'Mailchimp',
    description: 'Import your existing subscribers',
    icon: SiMailchimp,
    color: 'text-[#FFE01B]',
    available: true
  },
  {
    name: 'GitHub',
    description: 'Sync your documentation',
    icon: SiGithub,
    color: 'text-[#181717]',
    available: true
  },
  {
    name: 'Slack',
    description: 'Get notifications and updates',
    icon: SiSlack,
    color: 'text-[#4A154B]',
    available: true
  },
  {
    name: 'Notion',
    description: 'Manage your content',
    icon: SiNotion,
    color: 'text-[#000000]',
    available: true
  },
  {
    name: 'Zapier',
    description: 'Automate your workflows',
    icon: SiZapier,
    color: 'text-[#FF4A00]',
    available: false
  },
  {
    name: 'Stripe',
    description: 'Process payments securely',
    icon: SiStripe,
    color: 'text-[#008CDD]',
    available: false
  },
  {
    name: 'Airtable',
    description: 'Organize your data',
    icon: SiAirtable,
    color: 'text-[#2A9D8F]',
    available: false
  },
  {
    name: 'Intercom',
    description: 'Chat with your subscribers',
    icon: SiIntercom,
    color: 'text-[#1F89E5]',
    available: false
  },
  {
    name: 'WordPress',
    description: 'Sync with your blog',
    icon: SiWordpress,
    color: 'text-[#21759B]',
    available: false
  },
  {
    name: 'Shopify',
    description: 'Connect your store',
    icon: SiShopify,
    color: 'text-[#7AB55C]',
    available: false
  },
  {
    name: 'Webflow',
    description: 'Import your website forms',
    icon: SiWebflow,
    color: 'text-[#4353FF]',
    available: false
  },
  {
    name: 'HubSpot',
    description: 'Sync your CRM data',
    icon: SiHubspot,
    color: 'text-[#FF7A59]',
    available: false
  }
]

export default function Integrations() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">
            Integrate with Your Favorite Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect MailStride with the tools you already use and love.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group relative"
            >
              <div className={`relative p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg ${!integration.available && 'opacity-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`text-3xl ${integration.color} group-hover:scale-110 transition-transform duration-300`}>
                    <integration.icon />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {integration.name}
                      </h3>
                      {!integration.available && (
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-900/5 text-gray-900 rounded-full border border-gray-200 shadow-sm">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {integration.description}
                    </p>
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="text-gray-900 font-semibold flex items-center gap-2 mx-auto hover:gap-4 transition-all duration-300 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-lg group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Integrations
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 