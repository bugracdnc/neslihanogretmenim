<template>
    <div class="max-w-6xl mx-auto px-4">

        <div class="mb-10 max-w-4xl mx-auto">

            <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <div class="relative w-full">
                    <input v-model="searchQuery" type="text"
                        placeholder="Etkinlik, konu veya kelime ara... (örn: Toplama)"
                        class="w-full pl-8 pr-24 py-4 rounded-full border-2 border-pink-100 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50 transition-all text-lg shadow-sm placeholder-slate-400 text-slate-700" />
                    <button v-if="searchQuery" @click="searchQuery = ''"
                        class="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all"
                        title="Aramayı Temizle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                    <span
                        class="absolute right-6 top-1/2 -translate-y-1/2 text-2xl opacity-60 pointer-events-none">🌸</span>
                </div>

                <div
                    class="flex items-center bg-white/80 backdrop-blur-sm p-1.5 rounded-[1.25rem] border-2 border-pink-100 shadow-sm shrink-0">
                    <button @click="viewMode = 'grid'"
                        :class="viewMode === 'grid' ? 'bg-pink-100 text-pink-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                        class="p-2.5 rounded-xl transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button @click="viewMode = 'list'"
                        :class="viewMode === 'list' ? 'bg-pink-100 text-pink-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                        class="p-2.5 rounded-xl transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <div v-if="uniqueTags.length > 0" class="flex flex-wrap gap-2 items-center px-2">
                <span class="text-sm font-semibold text-slate-400 mr-2">Filtrele:</span>
                <button @click="selectedTag = null"
                    :class="!selectedTag ? 'bg-amber-400 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:bg-amber-50'"
                    class="px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200">
                    Tümü
                </button>
                <button v-for="tag in uniqueTags" :key="tag" @click="selectedTag = selectedTag === tag ? null : tag"
                    :class="selectedTag === tag ? 'bg-amber-400 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:bg-amber-50'"
                    class="px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200">
                    {{ tag }}
                </button>
            </div>

        </div>

        <TransitionGroup name="list" tag="div"
            :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-3 max-w-4xl mx-auto'">
            <div v-for="activity in filteredActivities" :key="activity.id"
                class="bg-white shadow-sm border border-amber-50 hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex"
                :class="viewMode === 'grid' ? 'rounded-[2.5rem] flex-col p-6 h-full hover:-translate-y-1' : 'rounded-2xl flex-col sm:flex-row items-start sm:items-center p-3 sm:pr-4 gap-4 hover:translate-x-1'">
                <div class="absolute bg-gradient-to-br from-amber-50 to-pink-50 rounded-full z-0 group-hover:scale-150 transition-transform duration-700"
                    :class="viewMode === 'grid' ? '-right-8 -top-8 w-32 h-32' : '-right-4 -top-4 w-16 h-16'"></div>

                <div v-if="viewMode === 'grid'"
                    class="w-full h-48 mb-5 bg-pink-50/50 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative border border-pink-100/50">
                    <img v-if="activity.thumbnail" :src="activity.thumbnail" alt=""
                        class="w-full h-full object-cover" />
                    <span v-else class="text-5xl opacity-50">🖼️</span>
                </div>

                <div v-else
                    class="hidden sm:flex w-16 h-16 bg-pink-50/50 rounded-xl items-center justify-center shrink-0 overflow-hidden relative border border-pink-100/50">
                    <img v-if="activity.thumbnail" :src="activity.thumbnail" alt=""
                        class="w-full h-full object-cover" />
                    <span v-else class="text-2xl opacity-50">🖼️</span>
                </div>

                <div class="relative z-10 flex-grow" :class="viewMode === 'list' && 'flex-1 min-w-0'">
                    <div class="flex flex-wrap items-center gap-2 mb-3" :class="viewMode === 'list' && 'mb-1'">
                        <span v-for="tag in activity.tags" :key="tag"
                            class="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-[10px] sm:text-xs font-extrabold tracking-wide uppercase rounded-full whitespace-nowrap">
                            {{ tag }}
                        </span>
                    </div>
                    <h3 class="font-bold text-slate-800"
                        :class="viewMode === 'grid' ? 'text-2xl mb-2' : 'text-lg truncate'">
                        {{ activity.title }}
                    </h3>
                    <p class="text-slate-500 leading-relaxed"
                        :class="viewMode === 'grid' ? '' : 'text-sm line-clamp-1'">
                        {{ activity.description }}
                    </p>
                </div>

                <div class="relative z-10"
                    :class="viewMode === 'grid' ? 'mt-auto pt-5 border-t border-pink-50/50 w-full' : 'w-full sm:w-auto shrink-0'">
                    <a :href="`${baseUrl}/etkinlik/${activity.id}`"
                        class="block text-center bg-gradient-to-r from-pink-200 to-amber-200 hover:from-pink-300 hover:to-amber-300 text-slate-800 font-bold transition-colors shadow-sm"
                        :class="[viewMode === 'grid' ? 'w-full py-4 rounded-2xl text-lg' : 'w-full sm:w-auto py-2.5 px-6 rounded-xl text-sm']">
                        İncele 🔍
                    </a>
                </div>
            </div>
        </TransitionGroup>

        <div v-if="filteredActivities.length === 0" class="text-center py-20">
            <p class="text-2xl text-slate-500 font-medium mb-4">Bu arama kriterlerine uygun etkinlik bulunamadı 🌼</p>
            <button @click="searchQuery = ''; selectedTag = null"
                class="px-6 py-2 bg-pink-100 text-pink-700 rounded-full font-bold hover:bg-pink-200 transition-colors">
                Filtreleri Temizle
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const baseUrl = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;

// id artık string oldu çünkü CMS, dosya adlarını (slug) id olarak kullanıyor
interface Activity {
    id: string;
    title: string;
    description: string;
    tags: string[];
    thumbnail?: string;
    file?: string;
}

const props = defineProps<{
    activities: Activity[];
}>();

const searchQuery = ref('');
const viewMode = ref<'grid' | 'list'>('grid');
const selectedTag = ref<string | null>(null);

const uniqueTags = computed(() => {
    const tagsSet = new Set<string>();
    props.activities.forEach(a => {
        if (a.tags) a.tags.forEach(t => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
});

onMounted(() => {
    const savedMode = localStorage.getItem('neslihan_view_mode');
    if (savedMode === 'list' || savedMode === 'grid') viewMode.value = savedMode;

    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get('search');
    const urlTag = params.get('tag');

    if (urlSearch) searchQuery.value = urlSearch;
    if (urlTag && uniqueTags.value.includes(urlTag)) selectedTag.value = urlTag;
});

watch(viewMode, (newMode) => {
    localStorage.setItem('neslihan_view_mode', newMode);
});

watch([searchQuery, selectedTag], ([newSearch, newTag]) => {
    const params = new URLSearchParams(window.location.search);

    if (newSearch) params.set('search', newSearch);
    else params.delete('search');

    if (newTag) params.set('tag', newTag);
    else params.delete('tag');

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
});

const filteredActivities = computed(() => {
    return props.activities.filter(a => {
        const searchMatch = !searchQuery.value ||
            a.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            (a.tags && a.tags.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase())));

        const tagMatch = !selectedTag.value || (a.tags && a.tags.includes(selectedTag.value));

        return searchMatch && tagMatch;
    });
});
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
}

.list-leave-active {
    position: absolute;
}
</style>