  import { Calendar, MapPin, Users } from 'lucide-react'
  import Image from "next/image"
  import {Button} from "@/components/ui/button";
  import Link from "next/link"

  export function MainContent() {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16">
      {/* Newspaper Title */}
      <div className="text-center mb-16">
      <h2 className="font-serif text-5xl md:text-7xl border-b-2 border-t-2 border-black py-4">
      The Okeogboran Chronicle
      </h2>
      </div>
      
      {/* Lead Story */}
      <article className="grid md:grid-cols-2 gap-8 mb-16">
      <div>
      <Image
      src="/landscape.jpg"
      alt="Town center of Okeogboran"
      width={600}
      height={400}
      className="w-full rounded-lg"
      />
      </div>
      <div className="space-y-4">
      <h3 className="font-serif text-3xl font-bold">A Rich Heritage Preserved</h3>
      <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
      Nestled in the heart of our region, Okeogboran stands as a testament to time, where traditional values 
      seamlessly blend with modern progress. Our town, with its historic architecture and vibrant community, 
      continues to charm visitors and residents alike.
      </p>
      <blockquote className="border-l-4 border-primary pl-4 italic my-8">
      &apos;Okeogboran represents the perfect harmony between preserving our heritage and embracing the future.&apos;
      </blockquote>
      </div>
      </article>
      
      {/* Three Column Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
      <section className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
      <MapPin className="h-5 w-5" />
      <h4 className="font-serif text-xl">Location & Geography</h4>
      </div>
      <p className="leading-relaxed">
      Situated in a picturesque valley, Okeogboran enjoys a mild climate year-round. 
      The surrounding hills provide breathtaking views and numerous hiking trails.
      </p>
      </section>
      
      <section className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
      <Users className="h-5 w-5" />
      <h4 className="font-serif text-xl">Community Life</h4>
      </div>
      <p className="leading-relaxed">
      Our close-knit community takes pride in maintaining strong bonds through various 
      cultural events, festivals, and regular town gatherings.
      </p>
      </section>
      
      <section className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
      <Calendar className="h-5 w-5" />
      <h4 className="font-serif text-xl">Events & Activities</h4>
      </div>
      <p className="leading-relaxed">
      Throughout the year, Okeogboran hosts numerous events that celebrate our heritage, 
      from traditional festivals to modern art exhibitions.
      </p>
      </section>
      </div>
      
      {/* Featured Story */}
      <article className="mb-16">
      <h3 className="font-serif text-2xl mb-4 border-b border-neutral-200 pb-2">
      Local Traditions & Customs
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
      <p className="leading-relaxed">
      The people of Okeogboran maintain a rich tapestry of cultural traditions that have 
      been passed down through generations. From our annual harvest festival to the monthly 
      community gatherings, these customs form the backbone of our social fabric.
      </p>
      <p className="leading-relaxed">
      Our town takes special pride in its traditional crafts, particularly in weaving and 
      pottery. Local artisans continue to practice these age-old skills, creating pieces 
      that are both functional and beautiful, attracting collectors from around the region.
      </p>
      </div>
      <div className="text-center mt-8">
      <Button asChild variant="outline" size="lg">
      <Link href="/about">
      Explore Our History
      </Link>
      </Button>
      </div>
      </article>
      
      {/* Major Families Section */}
      <article className="mb-16">
      <h3 className="font-serif text-3xl mb-6 border-b border-neutral-200 pb-2">
      Major Families of Okeogboran
      </h3>
      <h3 className="text-lg text-center font-bold mb-1">ODERU DESCENDANTS</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-6 rounded-lg mt-6">
      
      <p className="mb-2">There are 4 segments of the ODERU descendants as follows:</p>
      <h4 className="font-bold mt-2">(A) DESCENDANT OF ITAGUN FAMUWAGUN: FATUNMO / OREBISOLA / ADEBAYO / UMORU FELE</h4>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>OBAJI: IBUKUN FADEYI / IKUSIKA NOAH / ALABI MATHEW</li>
      <li>AJISOLA / BAYODE / ADELEYE /OLAMIDUN</li>
      <li>OLAJUYIGBE / ROTOLA / BAYODE</li>
      <li>ADEBISI / ABELEMURE / OJO THOMAS / OLATUNJI JAMES / AJAYI</li>
      <li>ADEOYE / JOHN</li>
      <li>OGUNROTIMI</li>
      <li>ORIDELE</li>
      <li>EYINMODE</li>
      <li>AGBAJA</li>
      <li>OLADIGBO</li>
      <li>AKINLOOSE / ABEL BOSEDE / OLONI EZEKIEL</li>
      </ul>
      <h4 className="font-bold mt-2">(B) DESCENDANT OF AROWOSOYE</h4>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>OGUNLEYES / OBATAAKI</li>
      <li>OLORUNTOBA ONIMOTELE</li>
      <li>OKEDUSI AWOLEGBE</li>
      <li>AROWOSOYE ABILORO ALAGBARA</li>
      <li>ADESINA / FAUYI / OLADOYINBO</li>
      <li>AGOI</li>
      <li>AROWOSOYE: OLORUNDIPE / SIMIDELE / OMOWON / BANKOLE</li>
      <li>AWOLO / LELE</li>
      </ul>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-6 rounded-lg mt-6">
      <h4 className="font-bold">(C) DESCENDANTS OF ASALOKE</h4>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>ADELEYE</li>
      <li>FABORODE - ISAAC / AYIKITIWOLEOWO / ALHAJISANNI / OGUNLA / HEZEKIAH / AMUSA / OGUNSADE SAMSON</li>
      <li>FAPARUSI</li>
      <li>FAPESE</li>
      <li>FAMUBO</li>
      <li>ELEGBELEYE</li>
      </ul>
      <h4 className="font-bold mt-2">(D) DESCENDANTS OF AJAGBOLE</h4>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>OLATOYEGUN</li>
      <li>ADEBUSOYE</li>
      <li>ALADEGOROYE / BALOGUN</li>
      <li>ADEGBOYE</li>
      <li>OYEGADE</li>
      <li>OLASEHINDE OTAUJA</li>
      <li>IKUMUYITE</li>
      <li>ALAKOLI</li>
      <li>OMOJEMINIYI</li>
      <li>OSANTAN</li>
      <li>OLUBOBOLA</li>
      <li>OLABIYI DAVID - OLORUNDA RUFUS/SAMUEL / OJUBEDE</li>
      </ul>
      </div>
      </div>
      
      <h3 className="text-lg text-center font-bold mb-1">ANOHUN SEGMENT</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-6 rounded-lg mt-6">
      <h4 className="font-bold">DESCENDANTS OF ANOHUN OKE</h4>
      <p className="font-bold">(A) OLUWOYE: AKEREDOLU :</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>ADEEYO</li>
      <li>OLOGUNDUDU</li>
      </ul>
      <p className="font-bold mt-2">(B) OMOEKUN: HE HAD 11 MALE CHILDREN MADE OF PROMINENT SONS AND GRANDSONS:</p>
      <p className="font-bold">(a) FIRST CHILD OLODOGBO:</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>YISA DADA</li>
      <li>ALUKUTE</li>
      <li>OBAMO</li>
      <li>T A FAMUWAGUN MOTHER</li>
      <li>EZEKIEL OLONI MOTHER</li>
      <li>FATHER OF COL IKUPOLATI MOTHER</li>
      </ul>
      <p className="font-bold">(b) OJUKO: SECOND CHILD</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>AFELUMOS FATHER</li>
      <li>FELEMU FAPOWOPO/ SALIU OJUKO FATHER</li>
      <li>OGUNMOYEDE</li>
      <li>GBELE (JIMOH / LAWRENCE)</li>
      <li>EWENLA / IFABUSUYI FATHER</li>
      <li>ADEYERI: 11TH SON & LAST BORN OF OJUKO</li>
      </ul>
      <p className="mt-2 pl-10">OGUNYE (OGOLO FATHER)</p>
      <p className="mt-2 mb-2 pl-10">ALADETUYI (FATHER OF SAMUEL IDOWU)</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>FATHER OF GBANIJOKE</li>
      <li>FADAHUN FATHER</li>
      <li>ADEBAYO ABRAHAM JEGEDE FATHER</li>
      <li>OLAIYA FATHER</li>
      </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-6 rounded-lg mt-6">
      <h4 className="font-bold">DESCENDANTS OF ANOHUN ODO</h4>
      <p className="font-bold">(A) LAWANI: He had 9 Wives.</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>ARIYO: SAMSON OLOTU/JOSHUA OJUTAYE</li>
      <li>FALOWO SOLOMON / OJO SAMUEL</li>
      <li>AJIBULU / REUBEN / OLOWOFEYEKU</li>
      <li>ELERO: AKINTAYO/ OJA/SUWAOLA/BALELAYO</li>
      </ul>
      <p className="mb-2 mt-2 pl-10">: OLORUNMO/SAMSON OJO/AJAYI/DELE</p>
      <ul>
      <li>SALAU: SIDIKU / TAPA</li>
      <li>OLATOKUNBO: EMMANUEL</li>
      </ul>
      
      <p className="font-bold mt-2">(B) ABE</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>BABATUYI</li>
      <li>OYEDEJI / OLORUNFEMI</li>
      <li>AKINBO</li>
      <li>OGUNYEBI / AKINYEMI</li>
      <li>AMUSA OMOTOSO</li>
      </ul>
      
      <p className="font-bold mt-2">(C) OJUMOLA:</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>OYEWUSI OLONISULU</li>
      <li>OYEYE RAPHAEL OLONISULU</li>
      <li>ADEDAYO MICHAEL OLONISULU</li>
      <li>GBADERO EDWARD</li>
      <li>SUNDAY GABRIEL (SHEHU)</li>
      <li>ALADEMOMI KUJO</li>
      </ul>
      
      <p className="font-bold mt-2">(D) OLOWOOKERE:</p>
      <ul className="list-disc list-inside space-y-2 dark:text-gray-200">
      <li>EMMANUEL</li>
      <li>RANSOME</li>
      </ul>
      </div>
      </div>
      
      </article>
      
      {/* News Grid */}
      <div className="grid md:grid-cols-3 gap-8">
      <div className="space-y-4">
      <h4 className="font-serif text-xl border-b border-neutral-200 pb-2">
      Local Government
      </h4>
      <p className="text-sm leading-relaxed">
      The town council meets regularly to discuss and implement initiatives that benefit 
      our community. Recent projects include the renovation of the historic town square 
      and improvements to public transportation.
      </p>
      </div>
      
      <div className="space-y-4">
      <h4 className="font-serif text-xl border-b border-neutral-200 pb-2">
      Education
      </h4>
      <p className="text-sm leading-relaxed">
      Our schools maintain high academic standards while incorporating local history 
      and cultural education into their curriculum. The community library serves as 
      a hub for learning and cultural exchange.
      </p>
      </div>
      
      <div className="space-y-4">
      <h4 className="font-serif text-xl border-b border-neutral-200 pb-2">
      Economic Development
      </h4>
      <p className="text-sm leading-relaxed">
      Local businesses continue to thrive, with a focus on sustainable practices 
      and community support. The weekly market remains a centerpiece of our 
      economic activity.
      </p>
      </div>
      </div>
      </main>
    )
  }