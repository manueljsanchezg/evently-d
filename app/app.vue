<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-40 bg-navy text-cream shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button type="button" class="flex items-center gap-3" @click="switchTab('explorar')">
          <div class="w-10 h-10 rounded-full bg-cream text-navy flex items-center justify-center font-serif font-bold text-2xl relative">
            e
            <span class="text-gold text-xs absolute -top-0.5 -right-0.5">✦</span>
          </div>
          <div class="text-left">
            <span class="font-serif text-2xl font-bold tracking-tight">evently</span>
            <p class="text-[10px] tracking-widest uppercase text-gold -mt-1">Conecta · Reserva · Celebra</p>
          </div>
        </button>

        <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            type="button"
            class="hover:text-gold transition"
            :class="activeTab === 'explorar' ? 'text-gold underline underline-offset-8' : ''"
            @click="switchTab('explorar')"
          >
            Explorar Proveedores
          </button>
          <button type="button" class="hover:text-gold transition flex items-center gap-1.5" :class="activeTab === 'comparador' ? 'text-gold underline underline-offset-8' : ''" @click="switchTab('comparador')">
            Comparador
            <span class="bg-gold text-navy text-xs font-bold px-2 py-0.5 rounded-full">{{ compareList.length }}</span>
          </button>
          <button type="button" class="hover:text-gold transition flex items-center gap-1.5" :class="activeTab === 'mievento' ? 'text-gold underline underline-offset-8' : ''" @click="switchTab('mievento')">
            Mi Evento
            <span class="bg-cream text-navy text-xs font-bold px-2 py-0.5 rounded-full">{{ selectedServices.length }}</span>
          </button>
        </nav>

        <button type="button" class="bg-gold hover:bg-goldDark text-navy font-bold text-sm px-5 py-2.5 rounded-full transition shadow-sm" @click="openPreventaModal">
          Acceso Preventa ✨
        </button>
      </div>

      <div class="md:hidden flex justify-around bg-navyLight py-2.5 text-xs border-t border-white/10">
        <button type="button" class="text-cream font-semibold" @click="switchTab('explorar')">Explorar</button>
        <button type="button" class="text-cream font-semibold" @click="switchTab('comparador')">Comparador ({{ compareList.length }})</button>
        <button type="button" class="text-cream font-semibold" @click="switchTab('mievento')">Mi Evento ({{ selectedServices.length }})</button>
      </div>
    </header>

    <main v-if="activeTab === 'explorar'" class="flex-1">
      <section class="bg-navy text-cream pt-12 pb-20 px-4 relative overflow-hidden">
        <div class="max-w-5xl mx-auto text-center relative z-10">
          <span class="inline-block bg-white/10 text-gold text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-5 border border-gold/30">
            Fase Preventa · Precios 100 % transparentes
          </span>
          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Organiza tu celebración con <span class="text-gold italic">precios reales</span> desde el segundo uno
          </h1>
          <p class="text-cream/85 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Olvídate de mandar 20 mensajes esperando presupuesto. Compara catering, fotografía, decoración y música con tarifas cerradas y reserva en minutos.
          </p>

          <div class="bg-creamSoft text-navy p-4 sm:p-5 rounded-2xl shadow-xl max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-navy/60 mb-1">Categoría</label>
              <select v-model="filterCategory" class="w-full bg-cream border border-navy/15 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-navy">
                <option value="Todas">Todas las categorías</option>
                <option value="Catering">Catering y Cóctel</option>
                <option value="Fotografía">Fotografía y Vídeo</option>
                <option value="Floristería">Floristería y Deco</option>
                <option value="Música">Música y DJ</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-navy/60 mb-1">Ciudad</label>
              <select v-model="filterCity" class="w-full bg-cream border border-navy/15 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-navy">
                <option value="Todas">Toda España</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-navy/60 mb-1">Tipo de evento</label>
              <select v-model="filterEvent" class="w-full bg-cream border border-navy/15 rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-navy">
                <option value="Todos">Cualquier evento</option>
                <option value="Navidad">Cena de Navidad / Casa</option>
                <option value="Cumpleaños">Cumpleaños / Fiesta</option>
                <option value="Boda">Boda / Comunión</option>
                <option value="Graduación">Graduación / Empresa</option>
              </select>
            </div>
            <div class="flex items-end">
              <button type="button" class="w-full bg-navy hover:bg-navyLight text-cream font-semibold py-2.5 px-4 rounded-xl text-sm transition" @click="resetFilters">
                Mostrar todos
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 class="font-serif text-3xl font-bold text-navy">Proveedores verificados con tarifa visible</h2>
            <p class="text-navy/70 text-sm mt-1">Haz clic en «Ver desglose» para calcular el precio exacto según tus invitados.</p>
          </div>
          <span class="text-xs font-bold uppercase tracking-wider bg-navy/10 text-navy px-3.5 py-1.5 rounded-full self-start">
            {{ filteredProviders.length }} {{ filteredProviders.length === 1 ? 'proveedor disponible' : 'proveedores disponibles' }}
          </span>
        </div>

        <div v-if="filteredProviders.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <article v-for="provider in filteredProviders" :key="provider.id" class="bg-creamSoft rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition gold-border flex flex-col">
            <div class="relative h-52">
              <img :src="provider.image" :alt="provider.name" class="w-full h-full object-cover">
              <span class="absolute top-3 left-3 bg-navy/90 text-cream text-xs font-semibold px-3 py-1 rounded-full">
                {{ provider.category }} · {{ provider.city }}
              </span>
              <span class="absolute bottom-3 right-3 bg-cream text-navy text-xs font-bold px-3 py-1 rounded-full shadow">
                ★ {{ provider.rating }} ({{ provider.reviews }})
              </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-serif text-xl font-bold text-navy leading-snug mb-2">{{ provider.name }}</h3>
                <p class="text-xs text-navy/75 leading-relaxed mb-4">{{ provider.summary }}</p>
              </div>
              <div>
                <div class="bg-cream rounded-xl p-3 mb-4 flex items-center justify-between border border-gold/30">
                  <div>
                    <span class="block text-[10px] uppercase tracking-wider font-bold text-navy/60">Tarifa transparente</span>
                    <span class="font-serif text-xl font-bold text-navy">{{ provider.basePrice }} € <span class="text-xs font-sans font-normal text-navy/70">{{ provider.pricingType === 'per_person' ? '/ persona' : 'cerrado' }}</span></span>
                  </div>
                  <span class="text-[11px] font-bold text-goldDark bg-gold/15 px-2.5 py-1 rounded-full">Precio real</span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button type="button" class="bg-navy hover:bg-navyLight text-cream text-xs font-bold py-2.5 px-3 rounded-xl transition" @click="openDetailModal(provider)">
                    Ver desglose
                  </button>
                  <button type="button" class="text-xs font-bold py-2.5 px-3 rounded-xl transition" :class="compareList.includes(provider.id) ? 'bg-gold text-navy' : 'bg-cream border border-navy/20 text-navy hover:bg-navy/5'" @click="toggleCompare(provider.id)">
                    {{ compareList.includes(provider.id) ? '✓ En comparador' : '+ Comparar' }}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="col-span-full text-center py-12 bg-creamSoft rounded-2xl gold-border">
          <p class="font-serif text-xl font-bold mb-2">No hay proveedores con esa combinación exacta</p>
          <button type="button" class="mt-2 bg-navy text-cream text-xs font-bold px-4 py-2 rounded-full" @click="resetFilters">Ver todos los proveedores</button>
        </div>
      </section>

      <section class="bg-navy text-cream py-16 px-4 mt-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <span class="text-gold text-xs font-bold uppercase tracking-widest">Sin llamadas ni esperas</span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold mt-2">Cómo funciona Evently</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(step, index) in howItWorks" :key="step.title" class="bg-navyLight p-7 rounded-2xl border border-gold/25">
              <div class="w-10 h-10 rounded-full bg-gold text-navy font-bold flex items-center justify-center mb-4">{{ index + 1 }}</div>
              <h3 class="font-serif text-xl font-bold mb-2">{{ step.title }}</h3>
              <p class="text-sm text-cream/80 leading-relaxed">{{ step.text }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <section v-if="activeTab === 'comparador'" class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-goldDark">Comparativa directa</span>
          <h2 class="font-serif text-3xl font-bold text-navy">Compara tus proveedores favoritos</h2>
          <p class="text-sm text-navy/70">Selecciona hasta 3 proveedores desde el catálogo para compararlos frente a frente.</p>
        </div>
        <button type="button" class="bg-navy text-cream text-sm font-semibold px-5 py-2.5 rounded-full self-start" @click="switchTab('explorar')">
          + Añadir proveedores
        </button>
      </div>

      <div class="bg-creamSoft rounded-2xl shadow-md gold-border p-6 overflow-x-auto">
        <div v-if="comparedProviders.length === 0" class="text-center py-12">
          <p class="font-serif text-xl font-bold mb-2">Aún no has seleccionado proveedores para comparar</p>
          <p class="text-sm text-navy/70 mb-4">Pulsa «+ Comparar» en las tarjetas del catálogo para ver sus tarifas y condiciones lado a lado.</p>
          <button type="button" class="bg-navy text-cream text-xs font-bold px-5 py-2.5 rounded-full" @click="switchTab('explorar')">Ir al catálogo</button>
        </div>
        <table v-else class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="border-b border-navy/15">
              <th class="py-4 px-3 text-xs uppercase tracking-wider text-navy/60 w-1/4">Característica</th>
              <th v-for="provider in comparedProviders" :key="provider.id" class="py-4 px-3 align-top">
                <div class="font-serif text-lg font-bold text-navy">{{ provider.name }}</div>
                <span class="text-xs text-goldDark font-semibold">{{ provider.category }} · {{ provider.city }}</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-navy/10 text-sm">
            <tr>
              <td class="py-4 px-3 font-semibold">Tarifa transparente</td>
              <td v-for="provider in comparedProviders" :key="provider.id" class="py-4 px-3 font-serif text-xl font-bold text-navy">{{ provider.basePrice }} € <span class="text-xs font-sans font-normal">{{ provider.unitLabel }}</span></td>
            </tr>
            <tr>
              <td class="py-4 px-3 font-semibold">Valoración</td>
              <td v-for="provider in comparedProviders" :key="provider.id" class="py-4 px-3">★ <strong>{{ provider.rating }}</strong> ({{ provider.reviews }} reseñas)</td>
            </tr>
            <tr>
              <td class="py-4 px-3 font-semibold align-top">Qué incluye</td>
              <td v-for="provider in comparedProviders" :key="provider.id" class="py-4 px-3 align-top">
                <ul class="space-y-1 text-xs"><li v-for="item in provider.includes" :key="item">✓ {{ item }}</li></ul>
              </td>
            </tr>
            <tr>
              <td class="py-4 px-3 font-semibold">Cancelación</td>
              <td v-for="provider in comparedProviders" :key="provider.id" class="py-4 px-3 text-xs">{{ provider.cancellation }}</td>
            </tr>
            <tr>
              <td class="py-4 px-3"></td>
              <td v-for="provider in comparedProviders" :key="provider.id" class="py-4 px-3 space-y-2">
                <button type="button" class="block w-full bg-navy text-cream text-xs font-bold py-2 px-3 rounded-lg" @click="openDetailModal(provider)">Elegir y calcular</button>
                <button type="button" class="block w-full text-xs text-navy/60 hover:text-navy underline" @click="toggleCompare(provider.id)">Quitar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="activeTab === 'mievento'" class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <span class="text-xs font-bold uppercase tracking-wider text-goldDark">Panel de organización</span>
        <h2 class="font-serif text-3xl font-bold text-navy">Mi Evento y Presupuesto Cerrado</h2>
        <p class="text-sm text-navy/70">Controla el coste exacto de tu celebración sin sorpresas finales y gestiona tus tareas.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-creamSoft rounded-2xl p-6 shadow-sm gold-border">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-serif text-xl font-bold">Servicios seleccionados</h3>
              <button type="button" class="text-xs font-bold text-navy underline" @click="switchTab('explorar')">+ Explorar más</button>
            </div>
            <div class="space-y-3">
              <p v-if="selectedServices.length === 0" class="text-sm text-navy/60 py-6 text-center bg-cream rounded-xl">Todavía no has añadido servicios. Explora el catálogo y calcula tu presupuesto.</p>
              <div v-for="service in selectedServices" :key="service.uid" class="flex items-center justify-between bg-cream p-4 rounded-xl border border-navy/10">
                <div>
                  <span class="text-[11px] font-bold uppercase text-goldDark">{{ service.category }} · {{ service.detailNote }}</span>
                  <h4 class="font-bold text-navy">{{ service.name }}</h4>
                </div>
                <div class="flex items-center gap-4">
                  <span class="font-serif text-lg font-bold">{{ service.total }} €</span>
                  <button type="button" class="text-xs text-red-600 hover:underline" @click="removeService(service.uid)">Quitar</button>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-creamSoft rounded-2xl p-6 shadow-sm gold-border">
            <h3 class="font-serif text-xl font-bold mb-4">Checklist de tu celebración</h3>
            <div class="flex gap-2 mb-4">
              <input v-model="newTask" type="text" placeholder="Añadir tarea (ej. Confirmar alergias del menú)..." class="flex-1 bg-cream border border-navy/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-navy" @keyup.enter="addTask">
              <button type="button" class="bg-navy text-cream text-sm font-semibold px-4 py-2 rounded-xl hover:bg-navyLight" @click="addTask">Añadir</button>
            </div>
            <ul class="space-y-2 text-sm">
              <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between bg-cream px-4 py-2.5 rounded-xl">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input v-model="task.done" type="checkbox" class="accent-navy w-4 h-4">
                  <span :class="task.done ? 'line-through text-navy/50' : 'text-navy'">{{ task.text }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-navy text-cream rounded-2xl p-7 shadow-lg h-fit">
          <span class="text-gold text-xs font-bold uppercase tracking-wider">Resumen transparente</span>
          <h3 class="font-serif text-2xl font-bold mt-1 mb-6">Presupuesto Total</h3>
          <div class="space-y-3 text-sm border-b border-white/15 pb-5 mb-5">
            <div class="flex justify-between"><span class="text-cream/75">Servicios añadidos</span><span class="font-semibold">{{ selectedServices.length }}</span></div>
            <div class="flex justify-between"><span class="text-cream/75">Comisión de gestión Evently</span><span class="text-gold font-semibold">0 € (Gratis en Preventa)</span></div>
            <div class="flex justify-between"><span class="text-cream/75">IVA e impuestos</span><span class="font-semibold">Incluidos</span></div>
          </div>
          <div class="flex justify-between items-baseline mb-6">
            <span class="text-base font-medium">Total estimado</span>
            <span class="font-serif text-3xl font-bold text-gold">{{ eventTotal }} €</span>
          </div>
          <button type="button" class="w-full bg-gold hover:bg-goldDark text-navy font-bold py-3.5 rounded-xl transition shadow-md" @click="simulateBooking">
            Simular Reserva Directa
          </button>
          <p class="text-[11px] text-cream/60 text-center mt-3">Precio cerrado garantizado sin cargos ocultos.</p>
        </div>
      </div>
    </section>

    <footer class="bg-navy text-cream/80 py-10 px-4 border-t border-gold/20 mt-16">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div class="flex items-center gap-2.5">
          <span class="font-serif text-xl font-bold text-cream">evently</span>
          <span class="text-gold">·</span>
          <span class="text-xs uppercase tracking-widest text-gold">Conecta · Reserva · Celebra</span>
        </div>
        <p class="text-xs text-cream/60">Proyecto académico · Prototipo funcional de campaña de preventa.</p>
      </div>
    </footer>

    <div v-if="detailModalOpen" class="fixed inset-0 z-50 bg-navy/75 backdrop-blur-sm flex items-center justify-center p-4" @click.self="closeDetailModal">
      <div class="bg-creamSoft text-navy rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button type="button" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-navy/10 hover:bg-navy hover:text-cream flex items-center justify-center font-bold" @click="closeDetailModal">✕</button>
        <template v-if="detailProvider">
          <span class="text-xs font-bold uppercase tracking-wider text-goldDark">{{ detailProvider.category }} · {{ detailProvider.city }}</span>
          <h3 class="font-serif text-2xl font-bold text-navy mt-1 mb-2">{{ detailProvider.name }}</h3>
          <p class="text-sm text-navy/80 mb-5">{{ detailProvider.summary }}</p>

          <div class="bg-cream rounded-xl p-4 mb-5 border border-gold/40">
            <h4 class="text-xs font-bold uppercase tracking-wider text-navy mb-2">Qué incluye exactamente este precio:</h4>
            <ul class="space-y-1.5 text-sm">
              <li v-for="item in detailProvider.includes" :key="item" class="flex items-center gap-2"><span class="text-goldDark font-bold">✓</span> {{ item }}</li>
            </ul>
            <p class="text-xs text-navy/60 mt-3 pt-2 border-t border-navy/10">Cancelación: <strong>{{ detailProvider.cancellation }}</strong></p>
          </div>

          <div v-if="detailProvider.pricingType === 'per_person'" class="mb-5">
            <div class="flex justify-between text-xs font-bold mb-1">
              <span>Número de invitados: <span class="text-goldDark text-sm">{{ modalGuests }} personas</span></span>
              <span>{{ detailProvider.basePrice }} €/persona</span>
            </div>
            <input v-model.number="modalGuests" type="range" :min="detailProvider.minUnits" max="100" class="w-full accent-navy cursor-pointer">
          </div>

          <div class="flex items-center justify-between bg-navy text-cream p-4 rounded-xl mb-5">
            <div>
              <span class="text-xs text-cream/70 block">Precio final cerrado</span>
              <span class="font-serif text-2xl font-bold text-gold">{{ detailTotal }} €</span>
            </div>
            <span class="text-xs bg-white/10 px-3 py-1 rounded-full">IVA incluido</span>
          </div>

          <button type="button" class="w-full bg-gold hover:bg-goldDark text-navy font-bold py-3 rounded-xl transition" @click="addToEvent">
            Añadir a Mi Evento
          </button>
        </template>
      </div>
    </div>

    <div v-if="preventaModalOpen" class="fixed inset-0 z-50 bg-navy/75 backdrop-blur-sm flex items-center justify-center p-4" @click.self="closePreventaModal">
      <div class="bg-navy text-cream rounded-2xl max-w-md w-full p-7 sm:p-8 shadow-2xl relative border border-gold/40">
        <button type="button" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center font-bold" @click="closePreventaModal">✕</button>
        <div v-if="!preventaSubmitted">
          <span class="text-gold text-xs font-bold uppercase tracking-widest">Lista VIP Preventa</span>
          <h3 class="font-serif text-3xl font-bold mt-1 mb-2">Estrena Evently antes que nadie</h3>
          <p class="text-sm text-cream/80 mb-6">Apúntate gratis y consigue prioridad de reserva, tarifas cerradas verificadas y 0 € de gastos de gestión en tu primer evento.</p>
          <form class="space-y-4" @submit.prevent="submitPreventa">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-gold mb-1">Tu nombre</label>
              <input v-model="preventaName" type="text" required placeholder="Ej. Laura Gómez" class="w-full bg-navyLight border border-white/20 rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold">
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-gold mb-1">Correo electrónico</label>
              <input v-model="preventaEmail" type="email" required placeholder="laura@email.com" class="w-full bg-navyLight border border-white/20 rounded-xl px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold">
            </div>
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-gold mb-1">Próxima celebración</label>
              <select v-model="preventaEvent" class="w-full bg-navyLight border border-white/20 rounded-xl px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold">
                <option>Cena de Navidad / Fin de año</option>
                <option>Cumpleaños o fiesta privada</option>
                <option>Boda, bautizo o comunión</option>
                <option>Graduación o evento universitario</option>
              </select>
            </div>
            <button type="submit" class="w-full bg-gold hover:bg-goldDark text-navy font-bold py-3 rounded-xl transition mt-2">Unirme gratis a la preventa ✨</button>
          </form>
        </div>
        <div v-else class="text-center py-6">
          <div class="w-14 h-14 rounded-full bg-gold text-navy text-2xl font-bold flex items-center justify-center mx-auto mb-4">✓</div>
          <h3 class="font-serif text-2xl font-bold mb-2">¡Ya estás dentro de la lista!</h3>
          <p class="text-sm text-cream/80 mb-6">Te avisaremos con acceso anticipado para que organices tu próxima celebración con precios reales y cero dramas.</p>
          <button type="button" class="bg-cream text-navy font-bold px-6 py-2.5 rounded-full text-sm" @click="closePreventaModal">Volver a Evently</button>
        </div>
      </div>
    </div>

    <div v-if="toastMessage" class="fixed bottom-5 right-5 z-50 bg-navy text-cream border border-gold px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Provider {
  id: number
  name: string
  category: string
  city: string
  eventType: string
  rating: string
  reviews: number
  pricingType: 'per_person' | 'fixed'
  basePrice: number
  unitLabel: string
  minUnits: number
  defaultUnits: number
  image: string
  summary: string
  includes: string[]
  cancellation: string
}

interface SelectedService {
  uid: number
  id: number
  name: string
  category: string
  detailNote: string
  total: number
}

const activeTab = ref('explorar')
const filterCategory = ref('Todas')
const filterCity = ref('Todas')
const filterEvent = ref('Todos')
const compareList = ref<number[]>([])
const selectedServices = ref<SelectedService[]>([])
const detailModalOpen = ref(false)
const detailProvider = ref<Provider | null>(null)
const modalGuests = ref(20)
const preventaModalOpen = ref(false)
const preventaSubmitted = ref(false)
const preventaName = ref('')
const preventaEmail = ref('')
const preventaEvent = ref('Cena de Navidad / Fin de año')
const toastMessage = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined

const providers: Provider[] = [
  { id: 1, name: 'La Mesa de Triana Catering', category: 'Catering', city: 'Sevilla', eventType: 'Navidad', rating: '4.9', reviews: 48, pricingType: 'per_person', basePrice: 28, unitLabel: '€/persona', minUnits: 10, defaultUnits: 20, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80', summary: 'Cóctel navideño y cenas en casa con 10 pases fríos/calientes, bebida y menaje incluido.', includes: ['6 aperitivos fríos y 4 calientes', 'Bebida incluida durante 3 horas', 'Cristalería, vajilla y camarero', 'Opción vegana y sin gluten sin sobrecoste'], cancellation: 'Gratuita hasta 7 días antes' },
  { id: 2, name: 'Luz del Sur Fotografía', category: 'Fotografía', city: 'Sevilla', eventType: 'Cumpleaños', rating: '5.0', reviews: 62, pricingType: 'fixed', basePrice: 320, unitLabel: 'Pack 3 horas', minUnits: 1, defaultUnits: 1, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', summary: 'Cobertura editorial espontánea para fiestas, cumpleaños y reuniones familiares.', includes: ['3 horas de cobertura continua', 'Galería privada con +150 fotos editadas', 'Entrega rápida en 48 horas', '15 fotos adelanto al día siguiente'], cancellation: 'Gratuita hasta 5 días antes' },
  { id: 3, name: 'Atelier Botánico Azahar', category: 'Floristería', city: 'Sevilla', eventType: 'Boda', rating: '4.8', reviews: 34, pricingType: 'fixed', basePrice: 240, unitLabel: 'Pack Deco Mesa', minUnits: 1, defaultUnits: 1, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', summary: 'Centros florales de temporada, velas altas y montaje completo para mesas largas.', includes: ['3 centros florales bajos o guirnalda', 'Portavelas dorados y velas incluidas', 'Montaje y recogida en domicilio o finca', 'Diseño personalizado a tu paleta'], cancellation: 'Gratuita hasta 10 días antes' },
  { id: 4, name: 'Sonido Giralda DJ & Live', category: 'Música', city: 'Sevilla', eventType: 'Graduación', rating: '4.9', reviews: 51, pricingType: 'fixed', basePrice: 390, unitLabel: 'Sesión 4 horas', minUnits: 1, defaultUnits: 1, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80', summary: 'Equipo de sonido profesional, iluminación ambiental y DJ con playlist a medida.', includes: ['4 horas de sesión DJ', 'Altavoces profesionales + micrófono', 'Iluminación cálida para pista', 'Reunión previa para elegir estilos'], cancellation: 'Gratuita hasta 7 días antes' },
  { id: 5, name: 'Velada Gourmet Madrid', category: 'Catering', city: 'Madrid', eventType: 'Navidad', rating: '4.9', reviews: 73, pricingType: 'per_person', basePrice: 34, unitLabel: '€/persona', minUnits: 12, defaultUnits: 25, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', summary: 'Menú degustación servido en mesa o formato cóctel para cenas privadas de empresa y amigos.', includes: ['Entrantes al centro + plato principal', 'Postre artesanal navideño', 'Servicio de sala y limpieza final', 'Maridaje de vinos incluido'], cancellation: 'Gratuita hasta 7 días antes' },
  { id: 6, name: 'Frame & Brillo Studio', category: 'Fotografía', city: 'Barcelona', eventType: 'Boda', rating: '4.8', reviews: 29, pricingType: 'fixed', basePrice: 410, unitLabel: 'Foto + Reel', minUnits: 1, defaultUnits: 1, image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80', summary: 'Fotografía natural + vídeo resumen vertical listo para compartir en redes sociales.', includes: ['4 horas de cobertura', '200 fotografías en alta resolución', '1 vídeo resumen vertical de 60 seg', 'Descarga directa para invitados'], cancellation: 'Gratuita hasta 7 días antes' }
]

const howItWorks = [
  { title: 'Conecta con precios reales', text: 'Filtra por ciudad, fecha y tipo de celebración viendo desde el principio cuánto cuesta cada servicio sin formularios eternos.' },
  { title: 'Compara sin hojas de Excel', text: 'Selecciona hasta 3 proveedores y pon sus paquetes lado a lado para revisar qué incluye cada uno y elegir con total seguridad.' },
  { title: 'Reserva y celebra', text: 'Añade tus servicios a «Mi Evento», controla el presupuesto total en tiempo real y bloquea tu fecha en un solo clic.' }
]

const tasks = ref([
  { id: 1, text: 'Definir lista aproximada de invitados', done: true },
  { id: 2, text: 'Comparar opciones de catering con precio cerrado', done: false },
  { id: 3, text: 'Bloquear fotógrafo antes de que suba la demanda', done: false }
])
const newTask = ref('')

const filteredProviders = computed(() => providers.filter(provider =>
  (filterCategory.value === 'Todas' || provider.category === filterCategory.value) &&
  (filterCity.value === 'Todas' || provider.city === filterCity.value) &&
  (filterEvent.value === 'Todos' || provider.eventType === filterEvent.value)
))

const comparedProviders = computed(() => compareList.value.map(id => providers.find(provider => provider.id === id)).filter((provider): provider is Provider => Boolean(provider)))
const eventTotal = computed(() => selectedServices.value.reduce((total, service) => total + service.total, 0))
const detailTotal = computed(() => detailProvider.value ? (detailProvider.value.pricingType === 'per_person' ? detailProvider.value.basePrice * modalGuests.value : detailProvider.value.basePrice) : 0)

function switchTab(tab: string) {
  activeTab.value = tab
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetFilters() {
  filterCategory.value = 'Todas'
  filterCity.value = 'Todas'
  filterEvent.value = 'Todos'
}

function toggleCompare(id: number) {
  if (compareList.value.includes(id)) {
    compareList.value = compareList.value.filter(item => item !== id)
    showToast('Eliminado del comparador')
  } else {
    if (compareList.value.length >= 3) {
      showToast('Máximo 3 proveedores en el comparador')
      return
    }
    compareList.value.push(id)
    showToast('Añadido al comparador')
  }
}

function openDetailModal(provider: Provider) {
  detailProvider.value = provider
  modalGuests.value = provider.defaultUnits
  detailModalOpen.value = true
}

function closeDetailModal() {
  detailModalOpen.value = false
}

function addToEvent() {
  if (!detailProvider.value) return
  selectedServices.value.push({
    uid: Date.now(),
    id: detailProvider.value.id,
    name: detailProvider.value.name,
    category: detailProvider.value.category,
    detailNote: detailProvider.value.pricingType === 'per_person' ? `${modalGuests.value} personas` : detailProvider.value.unitLabel,
    total: detailTotal.value
  })
  closeDetailModal()
  showToast(`«${detailProvider.value.name}» añadido a Mi Evento`)
}

function removeService(uid: number) {
  selectedServices.value = selectedServices.value.filter(service => service.uid !== uid)
}

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push({ id: Date.now(), text, done: false })
  newTask.value = ''
}

function simulateBooking() {
  if (selectedServices.value.length === 0) {
    showToast('Añade primero al menos un servicio a tu evento')
    return
  }
  openPreventaModal()
}

function openPreventaModal() {
  preventaSubmitted.value = false
  preventaModalOpen.value = true
}

function closePreventaModal() {
  preventaModalOpen.value = false
}

async function submitPreventa() {
  try {
    await $fetch('/api/preventa', {
      method: 'POST',
      body: {
        name: preventaName.value,
        email: preventaEmail.value,
        celebration: preventaEvent.value
      }
    })
    preventaSubmitted.value = true
  } catch (error: unknown) {
    const message = error && typeof error === 'object' && 'data' in error
      ? String((error as { data?: { statusMessage?: string } }).data?.statusMessage || 'No se pudo completar el registro')
      : 'No se pudo completar el registro'
    showToast(message)
  }
}

function showToast(message: string) {
  toastMessage.value = message
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 2800)
}
</script>

<style>
body {
  background-color: #FEF9E7;
  color: #071932;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.gold-border {
  border: 1px solid rgba(212, 175, 55, 0.35);
}
</style>
