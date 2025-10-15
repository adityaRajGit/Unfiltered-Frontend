import { Users, Zap, Shield, Heart } from 'lucide-react';

function BenefitsSection() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our One-on-One Sessions?</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center p-6">
                        <Shield className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Safe & Confidential</h3>
                        <p className="text-gray-600">Your privacy is our top priority in a secure environment</p>
                    </div>
                    <div className="text-center p-6">
                        <Heart className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Expert Therapists</h3>
                        <p className="text-gray-600">Licensed professionals with proven track records</p>
                    </div>
                    <div className="text-center p-6">
                        <Zap className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Quick Results</h3>
                        <p className="text-gray-600">Noticeable improvements within the first few sessions</p>
                    </div>
                    <div className="text-center p-6">
                        <Users className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Personalized Approach</h3>
                        <p className="text-gray-600">Customized strategies for your unique needs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection