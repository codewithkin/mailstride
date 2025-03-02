'use client'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with your first newsletter',
    features: [
      '100 subscribers',
      '1 Publication',
      'Basic Newsletter Editor',
      'Basic Analytics',
      'Standard Deliverability',
      'Limited Automations (3/mo)',
      'Platform Branding'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Growth',
    price: '$29',
    period: '/month',
    description: 'For growing newsletters and content creators',
    features: [
      '10,000 subscribers',
      'Up to 3 Publications',
      'Advanced Analytics',
      'Audience Segmentation',
      'Unlimited Automations',
      'Custom Domains',
      'API Access',
      'Ad Network Access',
      'Referral Program'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Professional',
    price: '$100',
    period: '/month',
    description: 'For professional publishers and businesses',
    features: [
      '50,000 subscribers',
      'Unlimited Publications',
      'No Platform Branding',
      'Priority Support',
      'Advanced Personalization',
      'Audio Newsletters',
      'Webhooks',
      'All Growth Features'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited subscribers',
      'Dedicated Account Manager',
      'Concierge Onboarding',
      'Custom Integrations',
      'Dedicated IP Address',
      'Infinite API Access',
      'All Professional Features'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden" id="pricing">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Start for free, upgrade as you grow. All paid plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-600 via-primary to-blue-500 text-white shadow-xl shadow-primary/30 scale-105 border-0 hover:shadow-2xl hover:shadow-primary/40 transition-shadow duration-300' 
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {plan.popular && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl" />
                </>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 font-inter ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`${plan.popular ? 'text-white/80' : 'text-gray-600'} text-sm mb-6`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 min-h-[320px]">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg 
                      className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className={`${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                className={`w-full py-4 px-8 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-white text-primary hover:bg-gray-50 shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 