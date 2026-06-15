<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('serviceCategory')->orderBy('id', 'asc')->get();
        return $this->success($services);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_category_id' => 'required|exists:service_categories,id',
            'slug' => 'required|string|unique:services,slug|max:255',
            'title' => 'required|string|max:255',
            'tagline' => 'required|string|max:255',
            'desc' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'required|string',
            'icon' => 'required|string|max:255',
        ]);

        $service = Service::create($validated);
        return $this->success($service->load('serviceCategory'), 'Service créé avec succès', 201);
    }

    public function update(Request $request, int $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return $this->notFound('Service introuvable');
        }

        $validated = $request->validate([
            'service_category_id' => 'sometimes|required|exists:service_categories,id',
            'slug' => 'sometimes|required|string|max:255|unique:services,slug,' . $id,
            'title' => 'sometimes|required|string|max:255',
            'tagline' => 'sometimes|required|string|max:255',
            'desc' => 'sometimes|required|string',
            'features' => 'sometimes|required|array',
            'features.*' => 'sometimes|required|string',
            'icon' => 'sometimes|required|string|max:255',
        ]);

        $service->update($validated);
        return $this->success($service->load('serviceCategory'), 'Service mis à jour avec succès');
    }

    public function destroy(int $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return $this->notFound('Service introuvable');
        }

        $service->delete();
        return $this->success(null, 'Service supprimé avec succès');
    }
}
